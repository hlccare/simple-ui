import { defineComponent, inject, ref, toRefs } from "vue";
import { TreeUtils } from "../composable/use-tree-types";
import { IInnerTreeNode } from "../tree-type";
import { TreeNodeProps, treeNodeProps } from "./tree-node-type";

const NODE_HEIGHT = 28;
const NODE_INDENT = 24;

export default defineComponent({
  name: "STreeNode",
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { checkable, treeNode, operable } = toRefs(props);
    const { toggleCheckNode, getChildren, append, remove } = inject(
      "TREE_UTILS"
    ) as TreeUtils;

    const isShow = ref(false);
    const toggleOperate = () => {
      if (isShow.value) {
        isShow.value = false;
      } else {
        isShow.value = true;
      }
    };
    return () => (
      <div
        class="s-tree-node hover:bg-slate-100 relative leading-8"
        style={{ paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px` }}
        // 操作按钮显示控制
        onMouseenter={toggleOperate}
        onMouseleave={toggleOperate}
      >
        {/* 辅助线 */}
        {!treeNode.value.isLeaf && treeNode.value.expanded && (
          <span
            class="s-tree-node__vline absolute w-px bg-gray-300"
            style={{
              height: `${NODE_HEIGHT * getChildren(treeNode.value).length}px`,
              left: `${NODE_INDENT * (treeNode.value.level - 1) + 12}px`,
              top: `${NODE_HEIGHT}px`,
            }}
          ></span>
        )}
        {/** 折叠图标 */}
        {treeNode.value.isLeaf ? (
          <span style={{ display: "inline-block", width: "25px" }}></span>
        ) : (
          slots.icon!()
        )}
        {/* 复选框 */}
        {checkable.value && (
          <input
            type="checkbox"
            v-model={treeNode.value.checked}
            onClick={() => toggleCheckNode(treeNode.value)}
          ></input>
        )}
        {/* 内容 */}
        {slots.content!()}

        {/* 增删控制 */}
        {operable.value && isShow.value && (
          <span class="inline-flex ml-1">
            <svg
              onClick={() => {
                append(treeNode.value, {
                  label: "新节点",
                } as IInnerTreeNode);
              }}
              viewBox="0 0 1024 1024"
              width="14"
              height="14"
              class="cursor-pointer"
            >
              <path d="M590.769231 571.076923h324.923077c15.753846 0 29.538462-13.784615 29.538461-29.538461v-59.076924c0-15.753846-13.784615-29.538462-29.538461-29.538461H590.769231c-11.815385 0-19.692308-7.876923-19.692308-19.692308V108.307692c0-15.753846-13.784615-29.538462-29.538461-29.538461h-59.076924c-15.753846 0-29.538462 13.784615-29.538461 29.538461V433.230769c0 11.815385-7.876923 19.692308-19.692308 19.692308H108.307692c-15.753846 0-29.538462 13.784615-29.538461 29.538461v59.076924c0 15.753846 13.784615 29.538462 29.538461 29.538461H433.230769c11.815385 0 19.692308 7.876923 19.692308 19.692308v324.923077c0 15.753846 13.784615 29.538462 29.538461 29.538461h59.076924c15.753846 0 29.538462-13.784615 29.538461-29.538461V590.769231c0-11.815385 7.876923-19.692308 19.692308-19.692308z"></path>
            </svg>
            <svg
              onClick={() => {
                remove(treeNode.value);
              }}
              viewBox="0 0 1024 1024"
              width="14"
              height="14"
              class="cursor-pointer ml-1"
            >
              <path d="M610.461538 500.184615l256-257.96923c11.815385-11.815385 11.815385-29.538462 0-41.353847l-39.384615-41.353846c-11.815385-11.815385-29.538462-11.815385-41.353846 0L527.753846 417.476923c-7.876923 7.876923-19.692308 7.876923-27.569231 0L242.215385 157.538462c-11.815385-11.815385-29.538462-11.815385-41.353847 0l-41.353846 41.353846c-11.815385 11.815385-11.815385 29.538462 0 41.353846l257.969231 257.969231c7.876923 7.876923 7.876923 19.692308 0 27.56923L157.538462 785.723077c-11.815385 11.815385-11.815385 29.538462 0 41.353846l41.353846 41.353846c11.815385 11.815385 29.538462 11.815385 41.353846 0L498.215385 610.461538c7.876923-7.876923 19.692308-7.876923 27.56923 0l257.969231 257.969231c11.815385 11.815385 29.538462 11.815385 41.353846 0L866.461538 827.076923c11.815385-11.815385 11.815385-29.538462 0-41.353846L610.461538 527.753846c-7.876923-7.876923-7.876923-19.692308 0-27.569231z"></path>
            </svg>
          </span>
        )}

        {/* loading状态 */}
        {treeNode.value.loading && slots.loading()}
      </div>
    );
  },
});
