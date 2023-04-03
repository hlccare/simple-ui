import { defineComponent, ref } from "vue";
import usePage from "./composables/use-page";
import { PaginationProps, paginationProps } from "./pagination-type";
import SPager from "./components/pager";

export default defineComponent({
  name: "SPagination",
  props: paginationProps,
  setup(props: PaginationProps) {
    const { prevPage, nextPage } = usePage();
    const pager = ref();
    return () => {
      return (
        <div class="s-pagination">
          <button onClick={() => pager.value.prevPage()}>上一页</button>
          {/* pager部分 */}
          <SPager {...props} ref={pager}></SPager>
          <button onClick={() => pager.value.nextPage()}>下一页</button>
        </div>
      );
    };
  },
});
