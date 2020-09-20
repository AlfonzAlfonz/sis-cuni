import React, { useState } from "react";
import { View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

import Info from "./components/Info";
import SisView from "./components/SisView";

export default function App () {
  const [activeInfo, setActiveInfo] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <SisView setProgress={setProgress} />

      {progress !== 1 && (
        <>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(255,255,255,0.2)" }}></View>
          <View style={{ position: "absolute", width: "100%", top: 22 }}>
            <ProgressBar width={null} progress={progress} color="#9f3853" height={3} borderRadius={0} borderWidth={0} />
          </View>
        </>
      )}

      <Info active={activeInfo} />
    </View>
  );
}
