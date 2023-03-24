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
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
