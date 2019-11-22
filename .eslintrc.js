module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "plugin:react/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    chrome: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    "react/jsx-filename-extension": 0,
    "react/no-unknown-property": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-indent-props": [2, 2],
    "react/prop-types": 0,
    "import/order": ["error"],
    "quotes": ["error", "double"],
    "max-len": [
      "error", {
        code: 120,
        tabWidth: 2,
      }
    ],
    "no-unused-vars": [
      "error"
    ],
  },
};
