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
            class="pr-1"
            disabled={disablePrev.value}
            onClick={() => pager.value.prevPage()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </button>
          {/* pager部分 */}
          <SPager {...props} ref={pager}></SPager>
          <button
            class="pl-1"
            disabled={disableNext.value}
            onClick={() => pager.value.nextPage()}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
              ></path>
            </svg>
          </button>
        </div>
      );
    };
  },
});
