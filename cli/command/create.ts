import * as inquirer from "inquirer";
import { red } from "kolorist";

const CREATE_TYPES = ["component", "lib-entry"];

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
};
