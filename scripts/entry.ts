import { App } from "vue";
import ButtonPlugin, { Button } from "../src/button";
import FormPlugin, { Form } from "../src/form";
import InputPlugin, { Input } from "../src/input";
import ModalPlugin, { Modal } from "../src/modal";
export { Button, Form, Input, Modal };

const installs = [ButtonPlugin, FormPlugin, InputPlugin, ModalPlugin];

export default {
  install(app: App) {
    installs.forEach((p) => app.use(p));
  },
};
