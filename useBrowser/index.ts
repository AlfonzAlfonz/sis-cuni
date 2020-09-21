import { useStyle } from "./useStyle/index";
import { MutableRefObject, useState } from "react";
import WebView from "react-native-webview";
import { useSource } from "./useSource/index";
import { Linking } from "react-native";

const styles = [
  require("../client/styles/content/alerts.scss"),
  require("../client/styles/content/index.scss"),
  require("../client/styles/content/homepage.scss"),
  require("../client/styles/content/timetable.scss"),
  require("../client/styles/footer.css"),
  require("../client/styles/header.scss"),
  require("../client/styles/index.css"),
  require("../client/styles/menu.scss")
];

export const useBrowser = (ref: MutableRefObject<WebView>) => {
  const [uri, setUri] = useState("https://is.cuni.cz/studium");
  const style = useStyle(styles, ref);
  const source = useSource();

  const javascript = `const css = \`${style!}\`; ${source}; true;`;

  return {
    javascript,
    uri,
    ready: !!(style && source),
    navigate: (url: string) => {
      if (url === uri) return true;

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
