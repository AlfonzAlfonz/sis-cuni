
/*
  Main script of the app

  Because of the limitations the current setup everything needs to be placed inside the function clientJS.
*/

declare const css: string;
declare const dev: boolean;
declare const ReactNativeWebView: any;

export const clientJS = () => {
  let loaded = false;
  const load = () => {
    loaded = true;
    injectStyles();
  };

  // Load styles as soon as posible
  setTimeout(() => document.head && load());

  window.addEventListener("DOMContentLoaded", () => {
    !loaded && load();
    lang();
    header();
    loginpage();
    timetable();
    filters();
    moduleId(dev);
  });

  // Inject compiled styles
  const injectStyles = () => {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.appendChild(document.createTextNode(`${css}`));
    document.head.appendChild(style);

    const meta = document.createElement("meta");
    meta.setAttribute("name", "viewport");
    meta.setAttribute("content", "width=device-width, initial-scale=1, minimum-scale=1");
    document.head.appendChild(meta);

    const roboto = document.createElement("meta");
    roboto.setAttribute("href", "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap");
    roboto.setAttribute("rel", "stylesheet");
    document.head.appendChild(roboto);
  };

  // Detect user's language
  const lang = () => {
    if (document.querySelector("#stev_lang_en")) {
      document.body.classList.add("lang_cs");
    } else {
      document.body.classList.add("lang_en");
    }
  };

  const header = () => {
    // Modify structure of the head
    const root = document.getElementById("stev_header");
    const bell = document.getElementById("stev_notify");
    const alerts = document.getElementById("stev_notify_bar");
    const burger = document.createElement("dir");
    const menu = document.getElementById("stev_role_icons");
    burger.setAttribute("id", "app-burger");

    bell && root?.appendChild(bell);
    alerts && root?.appendChild(alerts);
    root?.appendChild(burger);

    bell?.addEventListener("click", e => {
      e.stopPropagation();
      alerts?.classList.add("notif-open");
    });

    burger?.addEventListener("click", e => {
      e.stopPropagation();
      menu?.classList.add("menu-open");
    });

    window.addEventListener("click", () => {
      alerts?.classList.remove("notif-open");
      menu?.classList.remove("menu-open");
    });

    const name = document.querySelector<HTMLElement>("#stev_jmeno b");
    if (name) {
      document.querySelector<HTMLElement>("#stev_jmeno")!.innerText = name.innerText;
    }
  };

  // Detect if user is logged in and display login page if he's not
  const loginpage = () => {
    if (document.querySelector("#stev_role_icons.anonym") && window.location.pathname.startsWith("/studium/index.php")) {
      document.body.classList.add("body-with-login");

      document.querySelector("#flogin input[type=submit]")!.addEventListener("click", () => {
        ReactNativeWebView.postMessage("Hello!");
      });
    }
  };

  const timetable = () => {
    const tt = document.querySelector("#roztab");
    if (tt) {
      document.querySelectorAll("#roztab .inner > span.nowrap i,#roztab .inner > span.nowrap b")
        .forEach(e => {
          e.textContent = e.textContent!.split(/\s/).join("\n");
          const last = e.parentNode?.childNodes[e.parentNode?.childNodes.length - 1];
          if (last?.nodeType === 3) {
            e.parentNode?.removeChild(e.parentNode?.childNodes[e.parentNode?.childNodes.length - 1]);
          }
        });

      const tabimg = document.querySelector("tbody > tr > .row_tab img[src=\"../img/ico_pdf.png\"]")!;
      let tabs = tabimg;
      while (tabs.tagName !== "TABLE" || tabs.parentElement === null) {
        tabs = tabs.parentElement!;
      }
      tabs.classList.add("roztab-download");
    }
  };

  // Collapse all filters by default
  const filters = () => {
    const handles = document.querySelectorAll<HTMLAnchorElement>("a[id^='filtr_href_']");
    handles.forEach(h => h.click());
  };

  // Current page/module detection
  const moduleId = (debug: boolean = false) => {
    const module = /^\/studium\/([\w-]+)\//.exec(window.location.pathname);
    const page = /([\w-]+)\.php$/.exec(window.location.pathname);
    const q = new URLSearchParams(window.location.search);
    const doParam = q.get("do");
    const doeParam = q.get("doe");

    module && document.body.setAttribute("data-module", module[1]);
    page && document.body.setAttribute("data-page", page[1]);
    doParam && document.body.setAttribute("data-do", doParam);
    doeParam && document.body.setAttribute("data-doe", doeParam);

    if (!debug) return;

    const debugEl = document.createElement("div");
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    debugEl.textContent = `module: ${module?.[1]}; page: ${page?.[1]}; do: ${doParam}; doe: ${doeParam}`;
    debugEl.setAttribute("class", "__debug");
    document.body.appendChild(debugEl);
  };
};
