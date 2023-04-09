import {
  defineComponent,
  nextTick,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from "vue";
import { BasePopoverProps, basePopoverProps } from "./base-popover-type";
import {
  computePosition,
  arrow,
  offset,
  autoPlacement,
} from "@floating-ui/dom";
import "../style/base-popover.scss";
export default defineComponent({
  name: "SBasePopover",
  props: basePopoverProps,
  emits: ["update:modelValue"],
  setup(props: BasePopoverProps, { slots, attrs }) {
    const { host, modelValue, showArrow, placement } = toRefs(props);
    const hostRef =
      host.value instanceof HTMLElement ? host.value : host.value.$el;

    const overlayRef = ref();
    const arrowRef = ref();

    // 更新箭头位置
    const updatePosition = () => {
      const middleware = [];
      if (showArrow.value) {
        middleware.push(offset(8));
        middleware.push(arrow({ element: arrowRef.value }));
      }
      // 无指定placement，添加autoPlacement中间件
      if (!placement.value) {
        middleware.push(autoPlacement());
      }
      computePosition(hostRef, overlayRef.value, {
        middleware,
        placement: placement.value || "bottom",
      }).then(({ x, y, middlewareData, placement }) => {
        Object.assign(overlayRef.value.style, {
          left: x + "px",
          top: y + "px",
        });
        if (showArrow.value) {
          const { x: arrowX, y: arrowY } = middlewareData.arrow;

          // 需要隐藏的第一条边
          const currentSide = placement.split("-")[0];
          // 箭头定位位置
          const targetSide = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[currentSide];
          const SIDE = ["top", "right", "bottom", "left"];
          const prevIndex = SIDE.indexOf(currentSide) - 1;
          // 需要隐藏的另一条边
          const anotherSide = SIDE[prevIndex < 0 ? prevIndex + 4 : prevIndex];
          Object.assign(arrowRef.value.style, {
            left: arrowX + "px",
            top: arrowY + "px",
            [targetSide]: "-4px",
            [`border-${currentSide}-color`]: "transparent",
            [`border-${anotherSide}-color`]: "transparent",
          });
        }
      });
    };

    // 注册回调，更新位置
    const mutationObserver = new MutationObserver(() => updatePosition());

    // 观察modelValue
    watch(
      modelValue,
      (newVal) => {
        if (newVal) {
          nextTick(updatePosition);
          // 观察hostRef的尺寸变化
          hostRef.value &&
            mutationObserver.observe(hostRef, { attributes: true });
          // 监听resize和scroll
          window.addEventListener("resize", updatePosition);
          window.addEventListener("scroll", updatePosition);
        } else {
          // 隐藏时取消所有监听
          mutationObserver.disconnect();
          window.removeEventListener("resize", updatePosition);
          window.removeEventListener("scroll", updatePosition);
        }
      },
      {
        immediate: true,
      }
    );

    // 移除时取消监听
    onUnmounted(() => {
      mutationObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    });
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
