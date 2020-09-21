import React, { FC, useEffect, useRef, useState } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";

import { useBrowser } from "../useBrowser";
import { trace } from "../utils/trace";

interface Props {
  setProgress: (i: number) => unknown;
}

const SisView: FC<Props> = ({ setProgress }) => {
  const ref = useRef<WebView>(null!);
  const { javascript, uri, ready, navigate } = useBrowser(ref);

  useEffect(() => {
    const backAction = () => {
      ref.current.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      {ready && (
        <WebView
          source={{ uri }}
          onMessage={e => { }}
          injectedJavaScript={javascript}
          onLoadProgress={({ nativeEvent }) => {
            setProgress(nativeEvent.progress);
          }}
          onLoad={() => {
            setProgress(1);
          }}
          onShouldStartLoadWithRequest={req => navigate(req.url)}
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
