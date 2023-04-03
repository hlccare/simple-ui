import { computed, defineComponent, toRefs } from "vue";
import usePage from "../composables/use-page";
import { getCenterPage } from "../utils";
import { PagerProps, pagerProps } from "./pager-type";

export default defineComponent({
  name: "SPager",
  props: pagerProps,
  setup(props: PagerProps) {
    const { total, pageSize, pagerCount } = toRefs(props);
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value));
    const { pageIndex, setPageIndex, jumpPage, prevPage, nextPage } = usePage();

    const centerPages = computed(() =>
      getCenterPage(totalPage.value, pageIndex.value, pagerCount.value)
    );
    // 暴露给上下文，render函数中可以使用，父组件可以通过ref调用
    return {
      totalPage,
      pageIndex,
      setPageIndex,
      jumpPage,
      prevPage,
      nextPage,
      centerPages,
    };
  },
  render() {
    const {
      totalPage,
      setPageIndex,
      pageIndex,
      pagerCount,
      jumpPage,
      centerPages,
    } = this;
    return (
      <ul class="s-pager">
        <li
          onClick={() => setPageIndex(1)}
          class={{ current: pageIndex === 1 }}
        >
          1
        </li>
        {totalPage > pagerCount && pageIndex > Math.ceil(pagerCount / 2) && (
          <li class="more left" onClick={() => jumpPage(-5)}>
            ...
          </li>
        )}
        {centerPages.map((page) => (
          <li
            onClick={() => setPageIndex(page)}
            class={{ current: pageIndex === page }}
          >
            {page}
          </li>
        ))}

        {totalPage > pagerCount && pageIndex < Math.ceil(pagerCount / 2) + 1 && (
          <li class="more right" onClick={() => jumpPage(5)}>
            ...
          </li>
        )}
        {totalPage > 1 && (
          <li
            onClick={() => setPageIndex(totalPage)}
            class={{ current: pageIndex === totalPage }}
          >
            {totalPage}
          </li>
        )}
      </ul>
    );
  },
});
