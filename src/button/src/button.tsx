import { defineComponent, toRefs } from "vue";
import { ButtonProps, buttonProps } from "./button-types";
export default defineComponent({
  name: "SpButton",
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type } = toRefs(props);
    return () => {
      return (
        <button class={`sp-btn sp-btn--${type.value}`}>
          {slots.default ? slots.default() : ""}
        </button>
      );
    };
  },
});
