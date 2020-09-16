import React, { useRef, useState } from "react";
import { Button, View, Text, TouchableOpacity, Linking, Modal, TouchableHighlight } from "react-native";
import { WebView } from "react-native-webview";
import ProgressBar from "react-native-progress/Bar";

import { useStyle } from "./useStyle";
import Info from "./components/Info";

const styles = [
  require("./styles/content/alerts.scss"),
  require("./styles/content/index.scss"),
  require("./styles/content/homepage.scss"),
  require("./styles/content/timetable.scss"),
  require("./styles/footer.css"),
  require("./styles/header.scss"),
  require("./styles/index.css"),
  require("./styles/menu.scss")
];

export default function App () {
  const [uri, setUri] = useState("https://is.cuni.cz/studium");
  const ref = useRef<WebView>(null!);
  const style = useStyle(styles, ref);
  const [progress, setProgress] = useState(0);

  return (
    <View style={{ flex: 1 }}>

      {style && (
        <WebView
          source={{ uri }}
          onMessage={() => {}}
          injectedJavaScript={style}
          onLoadProgress={({ nativeEvent }) => {
            setProgress(nativeEvent.progress);
          }}
          onShouldStartLoadWithRequest={(request) => {
            if (request.url === uri) return true;

            if (request.url.startsWith("https://is.cuni.cz/studium") || request.url.startsWith("https://idp.cuni.cz")) {
              setUri(request.url);
            } else {
              Linking.openURL(request.url);
            }

            return false;
          }}
          ref={ref}
        />
      )}

      {progress !== 1 && (
        <>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.2)" }}></View>
          <View style={{ position: "absolute", width: "100%", top: 22 }}>
            <ProgressBar width={null} progress={progress} color="#5b5557" height={3} borderRadius={0} borderWidth={0} />
          </View>
        </>
      )}

      <Info uri={uri} />
    </View>
  );
}
