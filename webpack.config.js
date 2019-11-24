const webpack = require("webpack");
const path = require("path");
const fileSystem = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");
const env = require("./utils/env");

const alias = {};

const secretsPath = path.join(__dirname, (`secrets.${env.NODE_ENV}.js`));

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

const devMode = env.NODE_ENV === "development";

if (fileSystem.existsSync(secretsPath)) {
  alias.secrets = secretsPath;
}

const options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    background: path.join(__dirname, "src", "js", "background.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ...(!devMode ? [{
            loader: MiniCssExtractPlugin.loader,
          }] : []),
          ...(devMode ? ["style-loader"] : []),
          "css-loader",
        ],
        exclude: /node_modules\/(?!(font-awesome)\/).*/,
      },
      {
        test: /\.scss$/,
        use: [
          ...(!devMode ? [{
            loader: MiniCssExtractPlugin.loader,
          }] : []),
          ...(devMode ? ["style-loader"] : []),
          "css-loader",
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: new RegExp(`\.(${fileExtensions.join("|")})$`),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules\/(?!(font-awesome)\/).*/,
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new CopyWebpackPlugin([{
      from: "src/manifest.json",
      transform: (content) => {
        if (!devMode) {
          return content;
        }
        const manifestContent = JSON.parse(content.toString());
        return Buffer.from(JSON.stringify({ ...manifestContent, content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'" }));
      },
    }]),
    new CopyWebpackPlugin([{
      from: "./src/icons",
    }]),
    new CopyWebpackPlugin([{
      from: "./src/js/video",
      to: "./video",
    }]),
    new CopyWebpackPlugin([{
      from: "./_locales",
      to: "./_locales",
    }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.html"),
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["background"],
    }),
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
  ],
};

if (devMode) {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
