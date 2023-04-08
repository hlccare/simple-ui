import { ExtractPropTypes, PropType } from "vue";

export const tabsProps = {
  modelValue: {
    value: String,
    default: "",
  },
  closable: {
    type: Boolean,
    default: false,
  },
  addable: {
    type: Boolean,
    default: false,
  },
} as const;

export type TabsProps = ExtractPropTypes<typeof tabsProps>;

export type ITabData = {
  id: string;
  title: string;
  type?: "random";
  content?: string;
};
