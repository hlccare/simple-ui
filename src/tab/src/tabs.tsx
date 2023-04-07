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
    // 关闭方法
    const closeTab = (tabId: string, e: MouseEvent) => {
      e.stopPropagation();
      const tabIndex = tabsData.value.findIndex((item) => item.id === tabId);
      // 所关闭标签页为激活状态时
      if (activeTab.value === tabId) {
        let newActiveTabIndex: number = tabIndex;
        // 若该页未最末项，激活前项，否则激活后项
        if (tabIndex === tabsData.value.length - 1) {
          newActiveTabIndex--;
        } else {
          newActiveTabIndex++;
        }
        activeTab.value = tabsData.value[newActiveTabIndex].id;
      }
      tabsData.value.splice(tabIndex, 1);
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
                {/* 关闭图标 */}
                {props.closable && (
                  <svg
                    onClick={(e: MouseEvent) => closeTab(tab.id, e)}
                    viewBox="0 0 1024 1024"
                    width="12"
                    height="12"
                    style="margin-left: 8px"
                  >
                    <path d="M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"></path>
                  </svg>
                )}
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
