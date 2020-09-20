import { useEffect, useState } from "react";

import { clientJS } from "../client/source";
import { getAsset } from "../useStyle";
import { trace } from "../utils/trace";

const dev = process.env.NODE_ENV !== "production";

export const useSource = () => {
  const [source, setSource] = useState<string>();

  useEffect(() => {
    !dev && getAsset(require("../out/source.txt")).then(setSource);
  }, []);

  return `
    ${dev
      ? `${trace(clientJS.toString())}; clientJS()`
      : (source && `const exports = {};${source}; exports.clientJS();`)!}
  `;
};
