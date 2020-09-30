import { useStyle } from "./useStyle/index";
import { MutableRefObject, useState } from "react";
import WebView from "react-native-webview";
import { useSource } from "./useSource/index";
import { Linking } from "react-native";

const styles = [
  require("../client/styles/content/alerts.scss"),
  require("../client/styles/content/formDivPageBlock.scss"),
  require("../client/styles/content/index.scss"),
  require("../client/styles/module/grupicek.scss"),
  require("../client/styles/module/homepage.scss"),
  require("../client/styles/module/omne.scss"),
  require("../client/styles/module/predmety.scss"),
  require("../client/styles/module/rozvrhng.scss"),
  require("../client/styles/module/zkous_st.scss"),
  require("../client/styles/footer.scss"),
  require("../client/styles/header.scss"),
  require("../client/styles/index.scss"),
  require("../client/styles/menu.scss")
];

export const useBrowser = (ref: MutableRefObject<WebView>) => {
  const [uri, setUri] = useState("https://is.cuni.cz/studium");
  const style = useStyle(styles, ref);
  const source = useSource();

  const javascript = `
    const css = \`${style!}\`; 
    const dev = ${process.env.NODE_ENV !== "production" ? "true" : "false"};
    ${source}; 
    true;
  `;

  return {
    javascript,
    uri,
    ready: !!(style && source),
    navigate: (url: string) => {
      if (url === uri) return true;

      if (url.startsWith("https://is.cuni.cz/studium/predmety/index.php") && url.includes("do=download")) {
        Linking.openURL(url);
        return false;
      }

      if (url.startsWith("https://is.cuni.cz/studium") || url.startsWith("https://idp.cuni.cz")) {
        if (url.startsWith("https://is.cuni.cz/studium/login.php")) {
          setUri("https://is.cuni.cz/studium");
          alert("Neplatné jméno nebo heslo");
        } else {
          setUri(url);
        }
      } else {
        Linking.openURL(url);
      }

      return false;
    }
  };
};
