import { Ref, defineComponent, provide, ref } from "vue";
import { ITabData, TabsProps, tabsProps } from "./tabs-type";
export default defineComponent({
  name: "STabs",
  props: tabsProps,
  emits: ["update:modelValue"],
  setup(props: TabsProps, { slots }) {
    const tabsData = ref<ITabData[]>([]);
    provide("tabs-data", tabsData);
    const activeTab: Ref<string> = ref(props.modelValue);
    const changeTab = (tabId: string) => {
      activeTab.value = tabId;
    };
    provide("active-tab", activeTab);
    return () => {
      return (
        <div class="s-tabs">
          {/* 导航部分 */}
          <ul class="s-tabs__nav">
            {tabsData.value.map((tab) => (
              <li
                onClick={() => changeTab(tab.id)}
                class={tab.id === activeTab.value ? "active" : ""}
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
