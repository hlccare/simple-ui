import * as inquirer from "inquirer";
import { red } from "kolorist";
import createComponents from "../shared/create-components";
// 创建类型
const CREATE_TYPES = ["component", "lib-entry"];
// 组件分类
const DOCS_CATEGORIES = ["通用", "导航", "反馈", "数据录入", "数据显示"];

export const onCreate = async (args = { type: "" }) => {
  let { type } = args;
  // 未输入则提示重新输入
  if (!type) {
    const res = await inquirer.prompt<{ type: string }>([
      {
        // 获取输入后的属性名
        name: "type",
        // 交互方式
        type: "list",
        message: "请选择创建类型：",
        choices: CREATE_TYPES,
        default: 0,
      },
    ]);
    type = res.type;
  }
  if (!CREATE_TYPES.includes(type)) {
    console.log(red(`当前类型仅支持：${CREATE_TYPES.join(",")}，请重新选择`));
    return onCreate();
  }

  // 处理type，创建对应内容
  try {
    let info;
    switch (type) {
      case "component":
        info = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "请输入组件name，作为文件名和文件夹名称",
            validate(value: string) {
              if (value.trim() === "") {
                return "组件名不可为空";
              }
              return true;
            },
          },
          {
            name: "title",
            type: "input",
            message: "请输入组件中文名称，将在文档中显示",
            validate(value: string) {
              if (value.trim() === "") {
                return "组件名不可为空";
              }
              return true;
            },
          },
          {
            name: "category",
            type: "list",
            message: "请输入组件分类，将在文档列表分类中",
            choices: DOCS_CATEGORIES,
          },
        ]);
        createComponents(info);
        break;
      default:
        console.log("default");
    }
  } catch (error) {
    console.log(error);
  }
};
