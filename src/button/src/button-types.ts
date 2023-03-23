import { ExtractPropTypes, PropType } from "vue";

export type ButtonType = "primary" | "secondary" | "text";

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: "secondary",
  } as const,
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;
