const path = require("path");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "sitemap.xml"),
          to: path.resolve(__dirname, "dist", "sitemap.xml"),
        },
      ],
    }),
  ],
});
