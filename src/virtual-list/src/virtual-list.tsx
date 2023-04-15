import { defineComponent, toRefs } from "vue";
import { VirtualListProps, virtualListProps } from "./virtual-list-type";
export default defineComponent({
  name: "SVirtualList",
  props: virtualListProps,
  setup(props: VirtualListProps) {
    const { data } = toRefs(props);

    return () => {
      return (
        <div class="s-virtual-list__container">
          <div class="s-virtual-list__blank"></div>
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
