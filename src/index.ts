import { App } from "vue";
import SpButton from "./button/src/button";

// 具名导出
export { SpButton };

// 导出插件
export default {
  install(app: App) {
    app.component(SpButton.name, SpButton);
  },
};
