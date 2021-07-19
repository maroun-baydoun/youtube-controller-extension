module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: [
    "import",
    "wc"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    chrome: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
   
  },
  rules: {
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
