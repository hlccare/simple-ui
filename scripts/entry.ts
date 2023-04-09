import { App } from "vue";
import ButtonPlugin, { Button } from "../src/button";
import FormPlugin, { Form } from "../src/form";
import InputPlugin, { Input } from "../src/input";
import ModalPlugin, { Modal } from "../src/modal";
import TabsPlugin, { Tabs } from "../src/tab";
import PopoverPlugin, { Popover } from "../src/popover";
export { Button, Form, Input, Modal, Tabs, Popover };

const installs = [
  ButtonPlugin,
  FormPlugin,
  InputPlugin,
  ModalPlugin,
  TabsPlugin,
  PopoverPlugin,
];

export default {
  install(app: App) {
    installs.forEach((p) => app.use(p));
  },
};
