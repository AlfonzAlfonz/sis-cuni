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

  return style;
};

export const getAsset = async (s: string) => {
  const asset = Asset.fromModule(s);
  await asset.downloadAsync();
  return readAsStringAsync(asset.localUri!);
};

const compile = (input: string) =>
  stylis.serialize(stylis.compile(input), stylis.stringify);
