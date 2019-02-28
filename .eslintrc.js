module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    chrome: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    "react/jsx-filename-extension": 0,
    "react/no-unknown-property": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "max-len": [
      "error", {
        code: 120,
      }
    ],
    "no-unused-vars": [
      "error", { 
        "varsIgnorePattern": "h",
      },
    ],
  },
};
