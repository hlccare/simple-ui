import { computed, defineComponent, toRefs } from "vue";
import usePage from "./composables/use-page";
import { PaginationProps, paginationProps } from "./pagination-type";
export default defineComponent({
  name: "SPagination",
  props: paginationProps,
  setup(props: PaginationProps) {
    const { total, pageSize } = toRefs(props);
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value));
    const { pageIndex, setPageIndex, jumpPage, prevPage, nextPage } = usePage();

    return () => {
      return (
        <div class="s-pagination">
          <button onClick={prevPage}>上一页</button>
          <button onClick={() => setPageIndex(1)}>1</button>
          <button onClick={() => jumpPage(-5)}>...</button>
          <button onClick={() => setPageIndex(pageIndex.value)}>
            {pageIndex.value}
          </button>
          <button onClick={() => jumpPage(5)}>...</button>
          <button onClick={() => setPageIndex(10)}>{totalPage.value}</button>
          <button onClick={nextPage}>下一页</button>
        </div>
      );
    };
  },
});
