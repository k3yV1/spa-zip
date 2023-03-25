const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: '/spa-zip/',
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.github.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
      },
    },
  },
});
