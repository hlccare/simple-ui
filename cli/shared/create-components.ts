import { ensureDirSync } from "fs-extra";
import * as path from "path";
import { lightBlue, lightGreen } from "kolorist";
export interface ComponentMeta {
  name: string;
  title: string;
  category: string;
}

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
