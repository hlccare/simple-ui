import { defineComponent, onMounted, ref, toRefs } from "vue";
import { VirtualListProps, virtualListProps } from "./virtual-list-type";
export default defineComponent({
  name: "SVirtualList",
  props: virtualListProps,
  setup(props: VirtualListProps) {
    const { data, itemHeight } = toRefs(props);
    // 最外层container的ref
    const containerRef = ref();
    // container高度
    const containerHeight = ref(0);
    onMounted(() => {
      //获取挂载后container的高度
      containerHeight.value = containerRef.value.clientHeight;
    });
    return () => {
      return (
        <div class="s-virtual-list__container" ref={containerRef}>
          <div
            class="s-virtual-list__blank"
            style={{ height: `${data.value.length * itemHeight.value}px` }}
          ></div>
          <div class="s-virtual-list">
            {data.value.map((item) => (
              <div>{item}</div>
            ))}
          </div>
        </div>
      );
    };
  },
});
