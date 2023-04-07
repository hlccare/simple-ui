import { App } from "vue";
import ButtonPlugin, { Button } from "../src/button";
import FormPlugin, { Form } from "../src/form";
import InputPlugin, { Input } from "../src/input";
import ModalPlugin, { Modal } from "../src/modal";
import TabsPlugin, { Tabs } from "../src/tab";
export { Button, Form, Input, Modal, Tabs };

const installs = [
  ButtonPlugin,
  FormPlugin,
  InputPlugin,
  ModalPlugin,
  TabsPlugin,
];

export default {
  install(app: App) {
    installs.forEach((p) => app.use(p));
  },
};
