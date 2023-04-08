import { defineComponent, toRefs } from "vue";
import { PopoverProps, popoverProps } from "./popover-type";
import BasePopover from "../../base-popover/src/base-popover";
import "../style/popover.scss";
export default defineComponent({
  name: "SPopover",
  props: popoverProps,
  emits: ["update:modelValue"],
  setup(props: PopoverProps, { slots }) {
    const { modelValue, title } = toRefs(props);
    return () => (
      <>
        {modelValue.value && (
          <BasePopover class="s-popover" {...props}>
            <h4 class="s-popover__title">{title.value}</h4>
            {slots.default?.()}
          </BasePopover>
        )}
      </>
    );
  },
});
