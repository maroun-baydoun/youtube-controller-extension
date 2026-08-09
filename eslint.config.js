import js from "@eslint/js";
import globals from "globals";
import { configs as wcConfigs } from "eslint-plugin-wc";

const sharedRules = {
  quotes: ["error", "double"],
  "max-len": ["error", { code: 120, tabWidth: 2 }],
  "no-unused-vars": ["error"],
};

export default [
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },
  js.configs.recommended,
  wcConfigs["flat/recommended"],
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        chrome: "readonly",
      },
    },
    rules: sharedRules,
  },
  {
    files: ["public/video/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.browser,
      },
    },
    rules: sharedRules,
  },
  {
    files: ["vite.config.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: sharedRules,
  },
];
