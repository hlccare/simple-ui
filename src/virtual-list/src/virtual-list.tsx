import {
  SetupContext,
  computed,
  defineComponent,
  onMounted,
  ref,
  toRefs,
} from "vue";
import { VirtualListProps, virtualListProps } from "./virtual-list-type";
import "../style/virtual-list.scss";
export default defineComponent({
  name: "SVirtualList",
  props: virtualListProps,
  setup(props: VirtualListProps, { slots }: SetupContext) {
    const { data, itemHeight } = toRefs(props);
    // 最外层container的ref
    const containerRef = ref();
    // container高度
    const containerHeight = ref(0);
    // 可见item数量，根据高度动态计算
    const visibleCount = computed(() =>
      Math.ceil(containerHeight.value / itemHeight.value)
    );
    // 可见item的起始索引，默认从0开始
    const startIndex = ref(0);
    // 可视范围数据
    const visibleDataList = computed(() => {
      // 可视范围数据的末尾index，最小为data的长度
      const endIndex = Math.min(
        startIndex.value + visibleCount.value,
        data.value.length
      );
      return data.value.slice(startIndex.value, endIndex);
    });
    onMounted(() => {
      //获取挂载后container的高度
      containerHeight.value = containerRef.value.clientHeight;
    });

    //列表在Y轴transform的偏移量
    const offsetY = ref(0);
    const scrollEvent = (event: UIEvent) => {
      // 根据scrollTop更新展示数据，及调整list元素Y轴偏移量
      const { scrollTop } = event.target as HTMLElement;
      //向下取整，滚动量不足以遮挡一项内容时，完整展示
      startIndex.value = Math.floor(scrollTop / itemHeight.value);
      //根据scrollTop修改偏移量，让list跟着往下移动，减去的部分用来控制完整展示第一项内容
      offsetY.value = scrollTop - (scrollTop % itemHeight.value);
    };
    return () => {
      return (
        <div
          class="s-virtual-list__container"
          ref={containerRef}
          onScroll={scrollEvent}
        >
          <div
            class="s-virtual-list__blank"
            style={{ height: `${data.value.length * itemHeight.value}px` }}
          ></div>
          <div
            class="s-virtual-list"
            style={{ transform: `translateY(${offsetY.value}px)` }}
          >
            {visibleDataList.value.map((item) => slots.default?.({ item }))}
          </div>
        </div>
      );
    };
  },
});
