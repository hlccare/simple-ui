import { App } from "vue";
import ButtonPlugin, { Button } from "../src/button";
import FormPlugin, { Form } from "../src/form";

export { Button };

const installs = [ButtonPlugin, FormPlugin];

export default {
  install(app: App) {
    installs.forEach((p) => app.use(p));
  },
};
