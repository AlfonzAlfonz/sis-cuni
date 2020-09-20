import React, { FC, useRef, useState } from "react";
import { Linking } from "react-native";
import WebView from "react-native-webview";
import { useStyle } from "../useStyle";
import { useSource } from "../useSource/index";
import { trace } from "../utils/trace";

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

interface Props {
  setProgress: (i: number) => unknown;
}

const SisView: FC<Props> = ({ setProgress }) => {
  const [uri, setUri] = useState("https://is.cuni.cz/studium");
  const ref = useRef<WebView>(null!);
  const style = useStyle(styles, ref);
  const source = useSource();

  return (
    <>
      {style && (
        <WebView
          source={{ uri }}
          onMessage={e => { }}
          injectedJavaScript={`
            const css = \`${style}\`;

            ${source!}

            true;
          `}
          onLoadProgress={({ nativeEvent }) => {
            setProgress(nativeEvent.progress);
          }}
          onShouldStartLoadWithRequest={(request) => {
            if (request.url === uri) return true;

            if (request.url.startsWith("https://is.cuni.cz/studium") || request.url.startsWith("https://idp.cuni.cz")) {
              if (request.url.startsWith("https://is.cuni.cz/studium/login.php")) {
                setUri("https://is.cuni.cz/studium");
                alert("Neplatné jméno nebo heslo");
              } else {
                setUri(request.url);
              }
            } else {
              Linking.openURL(request.url);
            }

            return false;
          }}
          ref={ref}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn("WebView error: ", nativeEvent);
          }}
        />
      )}
    </>
  );
};

export default SisView;
