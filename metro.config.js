const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, "scss", "css", "txt"],
    sourceExts: [...defaultConfig.resolver.sourceExts, "cjs", "mjs"]
  }
};
