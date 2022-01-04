module.exports = {
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    // Naming bundle 'email_templates_bo'
    entry: {
      embed_bo: "./src/main.js",
    },
  },
  // css: {
  //     extract: false,
  // }
};
