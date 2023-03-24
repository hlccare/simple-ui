import { defineComponent, toRefs } from "vue";
import { ButtonProps, buttonProps } from "./button-types";
export default defineComponent({
  name: "SpButton",
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size } = toRefs(props);
    return () => {
      return (
        <button class={`s-btn s-btn--${type.value} s-btn--${size.value}`}>
          {slots.default ? slots.default() : ""}
        </button>
      );
    };
  },
});
