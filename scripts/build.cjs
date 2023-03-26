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

// 组件目录
const componentsDir = path.resolve(__dirname, "../src");

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

const createPackageJson = (name) => {
  const packageName = name ?? "simple-ui";
  const fileName = name ? "index" : "simple-ui";
  const fileStr = `{
  "name": "${packageName}",
  "version": "0.0.0",
  "main": "${fileName}.umd.cjs",
  "module": "${fileName}.esm.js"
}`;
  if (name) {
    // 单组件package.json
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      "utf-8"
    );
  } else {
    fsExtra.outputFile(
      path.resolve(outputDir, "package.json"),
      fileStr,
      "utf-8"
    );
  }
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
  createPackageJson();
};

// 按需打包
const buildSingle = async (name) => {
  await build(
    defineConfig({
      ...baseConfig,
      build: {
        rollupOptions,
        lib: {
          entry: path.resolve(componentsDir, name),
          name: "index",
          fileName: "index",
          formats: ["esm", "umd"],
        },
        outDir: path.resolve(outputDir, name),
      },
    })
  );
  createPackageJson(name);
};

const buildLib = async () => {
  await buildAll();

  // 按需
  fsExtra
    .readdirSync(componentsDir)
    .filter((name) => {
      const componentDir = path.resolve(componentsDir, name);
      const isDir = fsExtra.lstatSync(componentDir).isDirectory();
      return isDir && fsExtra.readdirSync(componentDir).includes("index.ts");
    })
    .forEach(async (name) => {
      await buildSingle(name);
    });
};

buildLib();
