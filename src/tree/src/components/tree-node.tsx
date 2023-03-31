import { defineComponent, inject, toRefs } from "vue";
import { IInnerTreeNode } from "../tree-type";
import { TreeNodeProps, treeNodeProps } from "./tree-node-type";

const NODE_HEIGHT = 28;
const NODE_INDENT = 24;

type TreeUtils = {
  toggleNode: (treeNode: IInnerTreeNode) => void;
  toggleCheckNode: (treeNode: IInnerTreeNode) => void;
  getChildren: (
    treeNode: IInnerTreeNode,
    recursive?: boolean
  ) => IInnerTreeNode[];
};

export default defineComponent({
  name: "STreeNode",
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { checkable, treeNode } = toRefs(props);
    const { toggleNode, toggleCheckNode, getChildren } = inject(
      "TREE_UTILS"
    ) as TreeUtils;
    return () => (
      <div
        class="s-tree-node hover:bg-slate-100 relative leading-8"
        style={{ paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px` }}
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
      </div>
    );
  },
});
