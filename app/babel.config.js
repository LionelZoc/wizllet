module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            assets: "./assets",
            screens: "./src/screens",
            components: "./src/components",
            store: "./src/store",
            applicationDucks: "./src/store/ducks/app",
            firestoreDucks: "./src/store/ducks/firestore",
            navigation: "./src/navigation",
            services: "./src/services",
            constants: "./src/constants",
            hooks: "./src/hooks"
          }
        }
      ],
    ]
  };
};
