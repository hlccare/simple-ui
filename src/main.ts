import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "./index.scss";
import SimpleUI from "./index";

// 使用全量导出
// import SimpleUI from "../dist/simple-ui.esm.js";

createApp(App).use(SimpleUI).mount("#app");
