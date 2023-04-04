import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { PaginationProps, paginationProps } from "./pagination-type";
import SPager from "./components/pager";

export default defineComponent({
  name: "SPagination",
  props: paginationProps,
  emits: ["update:model-value"],
  setup(props: PaginationProps, { emit }) {
    const pager = ref();
    const disablePrev = computed(() =>
      pager.value ? pager.value.pageIndex < 2 : true
    );
    const disableNext = computed(() =>
      pager.value ? pager.value.pageIndex > pager.value.totalPage - 1 : true
    );
    onMounted(() => {
      watch(
        () => pager.value.pageIndex,
        (newVal: number) => {
          emit("update:model-value", newVal);
        }
      );
      watch(
        () => props.modelValue,
        (newVal: number) => (pager.value.pageIndex = newVal)
      );
    });
    return () => {
      return (
        <div class="s-pagination">
          <button
            disabled={disablePrev.value}
            onClick={() => pager.value.prevPage()}
          >
            上一页
          </button>
          {/* pager部分 */}
          <SPager {...props} ref={pager}></SPager>
          <button
            disabled={disableNext.value}
            onClick={() => pager.value.nextPage()}
          >
            下一页
          </button>
        </div>
      );
    };
  },
});
