module.exports = {
  filenameHashing: false,
  chainWebpack: (config) => {
    // Not naming bundle 'app'
    config.entryPoints.delete("app");
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    // Naming bundle 'vip_tiers_bo'
    entry: {
      fomo_bo: "./src/main.js",
      vip_tiers_bo: "./src/main.js",
    },
  },
  // css: {
  //     extract: false,
  // }
};
