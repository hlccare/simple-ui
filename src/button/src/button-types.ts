import { ExtractPropTypes, PropType } from "vue";

export type ButtonType = "primary" | "secondary" | "text";
export type ButtonSize = "large" | "medium" | "small";

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: "secondary",
  } as const,
  size: {
    type: String as PropType<ButtonSize>,
    default: "medium",
  } as const,
  disabled: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
