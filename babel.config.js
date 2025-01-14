module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }], // Ensures compatibility with NativeWind
      "nativewind/babel", // Required for NativeWind's Babel plugin
    ],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./", // Allows "@" to resolve to the root directory
          },
        },
      ],
    ],
  };
};
