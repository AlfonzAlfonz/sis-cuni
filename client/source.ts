declare const css: string;
declare const ReactNativeWebView: any;
declare const dl_notify_init: any;

export const clientJS = () => {
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
  injectStyles();

  const lang = () => {
    if (document.querySelector("#stev_lang_en")) {
      document.body.classList.add("lang_cs");
    } else {
      document.body.classList.add("lang_en");
    }
  };
  lang();

  const header = () => {
    const root = document.getElementById("stev_header");
    const bell = document.getElementById("stev_notify");
    const alerts = document.getElementById("stev_notify_bar");

    bell && root?.appendChild(bell);
    alerts && root?.appendChild(alerts);

    bell?.addEventListener("click", e => {
      e.stopPropagation();
      alerts?.classList.add("open");
    });

    window.addEventListener("click", () => {
      alerts?.classList.remove("notif-open");
    });

    // dl_notify_init();
  };
  header();

  const loginpage = () => {
    if (document.querySelector("#stev_role_icons.anonym") && window.location.pathname.startsWith("/studium/index.php")) {
      document.body.classList.add("body-with-login");

      document.querySelector("#flogin input[type=submit]")!.addEventListener("click", () => {
        ReactNativeWebView.postMessage("Hello!");
      });
    }
  };
  loginpage();

  const homepage = () => {
    const isHomepage = Array
      .from(document.querySelectorAll("body > table table.menu tr.menu1 td a.menu"))
      .some(e => e.textContent?.includes("Textový režim"));

    if (isHomepage) {
      document.body.classList.add("body-with-homepage");
    }
  };
  homepage();

  const timetable = () => {
    const tt = document.querySelector("#roztab");
    if (tt) {
      Array
        .from(document.querySelectorAll("#roztab .inner > span.nowrap i,#roztab .inner > span.nowrap b"))
        .forEach(e => {
          e.textContent = e.textContent!.split(/\s/).join("\n");
          const last = e.parentNode?.childNodes[e.parentNode?.childNodes.length - 1];
          if (last?.nodeType === 3) {
            e.parentNode?.removeChild(e.parentNode?.childNodes[e.parentNode?.childNodes.length - 1]);
          }
        });

      const a = () => {
        const head: HTMLElement[] = Array.from(document.querySelectorAll("#roztab #head td"));

        const rect = tt?.getBoundingClientRect();

        head.map(h => {
          if (rect.top < 140) {
            h.style.top = Math.abs(rect.top - 140) - 2 + "px";
          } else {
            h.style.top = "0";
          }
        });
      };

      window.addEventListener("scroll", () => {
        a();
        setTimeout(a, 1);
        setTimeout(a, 3);
        setTimeout(a, 5);
        setTimeout(a, 8);
      });
    }
  };
  timetable();
};
