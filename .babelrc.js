
const features = require("./package.json").features || [];

const presets = [
  [
    "@babel/preset-env",
    {
      "useBuiltIns": "usage",
      "corejs": 3
    }
  ],

  ...(features.includes('react') ? ["@babel/preset-react"] : []),
];

const plugins = [];

module.exports = { presets, plugins };
