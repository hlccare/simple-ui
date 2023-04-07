import { Ref, defineComponent, inject } from "vue";
import { ITabData } from "./tabs-type";
export default defineComponent({
  name: "STab",
  props: {
    id: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { slots }) {
    const activeTab = inject("active-tab") as Ref<string>;
    const tabsData = inject("tabs-data") as Ref<Array<ITabData>>;
    tabsData.value.push({
      id: props.id,
      title: props.title,
    });
    return () =>
      props.id === activeTab.value && (
        <div class="s-tab">{slots.default?.()}</div>
      );
  },
});
