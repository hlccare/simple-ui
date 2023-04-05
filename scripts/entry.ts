import { App } from "vue";
import ButtonPlugin, { Button } from "../src/button";
import FormPlugin, { Form } from "../src/form";
import InputPlugin, { Input } from "../src/input";
export { Button, Form, Input };

const installs = [ButtonPlugin, FormPlugin, InputPlugin];

export default {
  install(app: App) {
    installs.forEach((p) => app.use(p));
  },
};
