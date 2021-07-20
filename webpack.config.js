const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = require("./utils/env");

const fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

const devMode = env.NODE_ENV === "development";

const options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    popup: path.join(__dirname, "src", "js", "popup.js"),
    shortcuts: path.join(__dirname, "src", "js", "background", "shortcuts"),
  },
  output: {
    path: path.join(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ...(!devMode
            ? [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
              ]
            : []),
          ...(devMode ? ["style-loader"] : []),
          "css-loader",
        ],
        exclude: /node_modules\/(?!(font-awesome)\/).*/,
      },
      {
        test: /\.scss$/,
        use: [
          ...(!devMode
            ? [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
              ]
            : []),
          ...(devMode ? ["style-loader"] : []),
          "css-loader",
          "sass-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: new RegExp(`\.(${fileExtensions.join("|")})$`),
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
        exclude: /node_modules\/(?!(font-awesome)\/).*/,
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          transform: (content) => {
            if (!devMode) {
              return content;
            }
            const manifestContent = JSON.parse(content.toString());
            return Buffer.from(
              JSON.stringify({
                ...manifestContent,
                content_security_policy:
                  "script-src 'self' 'unsafe-eval'  object-src 'self'",
              })
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/icons",
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/js/video",
          to: "./video",
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./_locales",
          to: "./_locales",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "popup.ejs"),
      filename: "popup.html",
      chunks: ["popup"],
      minify: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "background.html"),
      filename: "background.html",
      chunks: ["shortcuts"],
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
  ],
};

if (devMode) {
  options.devtool = "eval-cheap-module-source-map";
} else {
  options.plugins = [new CleanWebpackPlugin(), ...options.plugins];
}

module.exports = options;
