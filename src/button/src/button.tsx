import { defineComponent, toRefs } from "vue";
import { ButtonProps, buttonProps } from "./button-types";
export default defineComponent({
  name: "SpButton",
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size, disabled, block } = toRefs(props);
    const blockCls = block.value ? "s-btn--block" : "";
    return () => {
      return (
        <button
          disabled={disabled.value}
          class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`}
        >
          {slots.default ? slots.default() : "content"}
        </button>
      );
    };
  },
});
