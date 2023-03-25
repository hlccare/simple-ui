const path = require("path");
const { defineConfig, build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const vueJsx = require("@vitejs/plugin-vue-jsx");
const fsExtra = require("fs-extra");

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()],
});
const entryFile = path.resolve(__dirname, "./entry.ts");

const outputDir = path.resolve(__dirname, "../dist");

// rollup配置
const rollupOptions = {
  // 外置
  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};

const createPackageJson = () => {
  const fileStr = `{
  "name": "simple-ui",
  "version": "0.0.0",
  "main": "simple-ui.umd.cjs",
  "module": "simple-ui.esm.js"
}`;
  fsExtra.outputFile(path.resolve(outputDir, "package.json"), fileStr, "utf-8");
};

// 全量构建
const buildAll = async () => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: entryFile,
          name: "simple-ui",
          fileName: "simple-ui",
          formats: ["esm", "umd"],
        },
        outDir: outputDir,
      },
    })
  );
};

const buiidLib = async () => {
  await buildAll();
  createPackageJson();
};

buiidLib();
