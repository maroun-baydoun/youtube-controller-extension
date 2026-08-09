import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src",
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    target: "chrome120",
    modulePreload: {
      resolveDependencies: (_url, deps, { hostType }) => {
        // This extension has no dynamic imports in its HTML entry points.
        // Dropping HTML preload deps avoids unused modulepreload links in the
        // built popup/background pages and the related browser warning.
        if (hostType === "html") {
          return [];
        }

        return deps;
      },
    },
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup.html"),
        background: resolve(__dirname, "src/background.js"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
