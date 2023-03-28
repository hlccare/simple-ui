import { ensureDirSync, WriteFileOptions, writeFileSync } from "fs-extra";
import * as path from "path";
import { lightBlue, lightGreen } from "kolorist";
import genCoreTemplate from "../template/core";
import genTypesTemplate from "../template/types";
import genStyleTemplate from "../template/style";
import genTestTemplate from "../template/test";
export interface ComponentMeta {
  name: string;
  title: string;
  category: string;
}

const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: "utf-8" };

const createComponent = (meta: ComponentMeta) => {
  const { name } = meta;

  // 组件目录
  const componentDir = path.resolve("../src", name);

  // 其他文件目录
  const srcDir = path.resolve(componentDir, "src");
  const styleDir = path.resolve(componentDir, "style");
  const testDir = path.resolve(componentDir, "test");

  // 确保该目录存在,如果目录结构不存在,它将由该函数创建
  ensureDirSync(srcDir);
  ensureDirSync(styleDir);
  ensureDirSync(testDir);

  // 文件及内容
  const coreFilePath = path.resolve(srcDir, name) + ".tsx";
  writeFileSync(coreFilePath, genCoreTemplate(name), WRITE_FILE_OPTIONS);

  // 组件类型文件
  const typesFilePath = path.resolve(srcDir, name + "-type.ts");
  writeFileSync(typesFilePath, genTypesTemplate(name), WRITE_FILE_OPTIONS);

  // 组件样式文件
  const styleFilePath = path.resolve(styleDir, `${meta.name}.scss`);
  writeFileSync(styleFilePath, genStyleTemplate(name), WRITE_FILE_OPTIONS);

  // 测试文件
  const testFilePath = path.resolve(testDir, `${meta.name}.test.ts`);
  writeFileSync(testFilePath, genTestTemplate(name), WRITE_FILE_OPTIONS);

  console.log(
    lightGreen(`
    ✅ 组件${name}目录创建完成
  `),
    lightBlue(`
    ✅ 组件目录: ${componentDir}
  `)
  );
};

export default createComponent;
