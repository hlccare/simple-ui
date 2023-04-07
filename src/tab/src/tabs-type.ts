import { ExtractPropTypes, PropType } from "vue";

export const tabsProps = {
  modelValue: {
    value: String,
    default: "",
  },
} as const;

export type TabsProps = ExtractPropTypes<typeof tabsProps>;
