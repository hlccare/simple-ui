import { defineComponent, nextTick, ref, toRefs, watch } from "vue";
import { BasePopoverProps, basePopoverProps } from "./base-popover-type";
import { computePosition, arrow, offset } from "@floating-ui/dom";
import "../style/base-popover.scss";
export default defineComponent({
  name: "SBasePopover",
  props: basePopoverProps,
  emits: ["update:modelValue"],
  setup(props: BasePopoverProps, { slots, attrs }) {
    const { host, modelValue, showArrow } = toRefs(props);
    const hostRef =
      host.value instanceof HTMLElement ? host.value : host.value.$el;

    const overlayRef = ref();
    const arrowRef = ref();

    const updatePosition = () => {
      const middleware = [];
      if (showArrow.value) {
        middleware.push(offset(8));
        middleware.push(arrow({ element: arrowRef.value }));
      }
      computePosition(hostRef, overlayRef.value, {
        middleware,
      }).then(({ x, y, middlewareData }) => {
        Object.assign(overlayRef.value.style, {
          left: x + "px",
          top: y + "px",
        });
        if (showArrow.value) {
          Object.assign(arrowRef.value.style, {
            left: middlewareData.arrow?.x + "px",
            top: "-4px",
            "border-bottom-color": "transparent",
            "border-right-color": "transparent",
          });
        }
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
          <div ref={overlayRef} class="s-base-popover" {...attrs}>
            {slots.default?.()}
            {/* 箭头 */}
            {showArrow.value && (
              <div class="s-base-popover__arrow" ref={arrowRef}></div>
            )}
          </div>
        )}
      </>
    );
  },
});
