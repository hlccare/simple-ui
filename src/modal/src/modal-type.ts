import { ExtractPropTypes, PropType } from "vue";

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: "50%",
  },
} as const;

export type ModalProps = ExtractPropTypes<typeof modalProps>;
