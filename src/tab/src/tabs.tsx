import { Ref, defineComponent, ref } from "vue";
import { TabsProps, tabsProps } from "./tabs-type";
export default defineComponent({
  name: "STabs",
  props: tabsProps,
  emits: ["update:modelValue"],
  setup(props: TabsProps, { slots }) {
    const tabsData = ref([
      { id: "tabs1", title: "Tabs1" },
      { id: "tabs2", title: "Tabs2" },
    ]);
    const activeTab: Ref<string> = ref(props.modelValue);
    const changeTab = (tabId: string) => {
      activeTab.value = tabId;
    };
    return () => {
      return (
        <div class="s-tabs">
          {/* 导航部分 */}
          <ul class="s-tabs__nav">
            {tabsData.value.map((tab) => (
              <li
                onClick={() => changeTab(tab.id)}
                class={tab.id === activeTab.value}
              >
                {tab.title}
              </li>
            ))}
          </ul>
          {/* 内容部分 */}
          {slots.default?.()}
        </div>
      );
    };
  },
});
