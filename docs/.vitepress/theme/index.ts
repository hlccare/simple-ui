import Theme from "vitepress/dist/client/theme-default/index.js";

import HelloWorld from "../../../src/components/HelloWorld.vue";
import Test from "../../../src/components/Test";
// import { HelloWorld, Test } from "../../../src/entry";
// 主题样式
// import "vitepress-theme-demoblock/theme/styles/index.css";
// demo组件
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import button from "../../../src/button/src/button";
import "../../../src/index.scss";

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }) {
    // 注册组件
    app.component("HelloWorld", HelloWorld);
    app.component("Test", Test);
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
    app.component("SButton", button);
  },
};
