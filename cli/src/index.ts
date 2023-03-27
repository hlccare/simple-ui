import { onCreate } from "./../command/create";
import { Command } from "commander";

// 创建命令对象
const cmd = new Command();

// 注册命令、参数，以及用户传入之后的回调函数
cmd
  .command("create")
  .description("创建一个组件模版或配置文件")
  // 命令参数 -t | --type
  .option("-t --type <type>", "创建类型，可选值： component, lib-entry")
  // 注册回调
  .action(onCreate);

// 执行命令行参数的解析
cmd.parse();
