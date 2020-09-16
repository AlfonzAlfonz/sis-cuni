import { Asset } from "expo-asset";
import { readAsStringAsync } from "expo-file-system";
import { MutableRefObject, useEffect, useState } from "react";
import WebView from "react-native-webview";
import * as stylis from "stylis/index";

export const useStyle = (source: string[], ref: MutableRefObject<WebView>) => {
  const [style, setStyle] = useState<string>();

  useEffect(() => {
    Promise.all(source.map(getAsset))
      .then(styles => styles.join("\n\n"))
      .then(compile)
      .then(setStyle);
    ref.current?.reload();
  }, [ref, source]);

  return style && `
      const css = \`${style}\`;

      ${clientJS.toString()}
      clientJS();

      true;
  `;
};

const getAsset = async (s: string) => {
  const asset = Asset.fromModule(s);
  await asset.downloadAsync();
  return readAsStringAsync(asset.localUri!);
};

const compile = (input: string) =>
  stylis.serialize(stylis.compile(input), stylis.stringify);

declare const css: string;
const clientJS = () => {
  const style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.appendChild(document.createTextNode(`${css}`));
  document.head.appendChild(style);

  const meta = document.createElement("meta");
  meta.setAttribute("name", "viewport");
  meta.setAttribute("content", "width=device-width, initial-scale=1, minimum-scale=1");
  document.head.appendChild(meta);

  if (document.querySelector("#stev_role_icons.anonym") && window.location.pathname.startsWith("/studium/index.php")) {
    document.body.classList.add("body-with-login");
  }

  const menuItems: Element[] = Array.from(
    document.querySelectorAll("body > table table.menu tr.menu1 td a.menu")
  );

  const isHomepage = menuItems.some(e => {
    return e.textContent?.includes("Textový režim");
  });
  if (isHomepage) {
    document.body.classList.add("body-with-homepage");
  }

  const ttItems = Array.from(document.querySelectorAll("#roztab .inner > span.nowrap i,#roztab .inner > span.nowrap b"));

  ttItems.forEach(e => {
    // alert(e.textContent!.split(/\s/));
    e.textContent = e.textContent!.split(/\s/).join("\n");
    const last = e.parentNode?.childNodes[e.parentNode?.childNodes.length - 1];
    if (last?.nodeType === 3) {
      e.parentNode?.removeChild(e.parentNode?.childNodes[e.parentNode?.childNodes.length - 1]);
    }
  });
};
