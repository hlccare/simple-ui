import { defineComponent, nextTick, ref, toRefs, watch } from "vue";
import { BasePopoverProps, basePopoverProps } from "./base-popover-type";
import { computePosition } from "@floating-ui/dom";
export default defineComponent({
  name: "SBasePopover",
  props: basePopoverProps,
  emits: ["update:modelValue"],
  setup(props: BasePopoverProps, { slots, attrs }) {
    const { host: hostRef, modelValue } = toRefs(props);
    const overlayRef = ref();

    const updatePosition = () => {
      computePosition(hostRef.value, overlayRef.value).then(({ x, y }) => {
        Object.assign(overlayRef.value.style, {
          left: x + "px",
          top: y + "px",
        });
      });
    };

    watch(
      modelValue,
      (newVal) => {
        if (newVal) {
          nextTick(updatePosition);
        }
      },
      {
        immediate: true,
      }
    );
    return () => (
      <>
        {modelValue.value && (
          <div ref={hostRef} class="s-base-popover" {...attrs}>
            {slots.default?.()}
          </div>
        )}
      </>
    );
  },
});
