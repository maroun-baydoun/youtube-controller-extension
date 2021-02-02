
const features = require("./package.json").features || {};

const presets = [
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      "corejs": 3
    }
  ],

  ...(!!features['react'] ? ["@babel/preset-react"] : []),
];

const plugins = [

  ...(!!features['prismjs'] ? [["prismjs", {
    "languages": features['prismjs'].languages,
    "theme": "default",
    "css": true
  }]] : []),
  
];

module.exports = { presets, plugins };
