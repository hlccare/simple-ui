import { defineComponent, toRefs } from "vue";
import useTree from "./composable/use-tree";
import { TreeProps, treeProps } from "./tree-type";

const NODE_HEIGHT = 28;
const NODE_INDENT = 24;

export default defineComponent({
  name: "STree",
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data, checkable } = toRefs(props);
    const { expandedTree, toggleNode, getChildren, toggleCheckNode } =
      useTree(data);
    return () => {
      return (
        <div class="s-tree">
          {expandedTree.value.map((treeNode) => (
            <div
              class="s-tree-node hover:bg-slate-100 relative leading-8"
              style={{ paddingLeft: `${NODE_INDENT * (treeNode.level - 1)}px` }}
            >
              {/* 辅助线 */}
              {!treeNode.isLeaf && treeNode.expanded && (
                <span
                  class="s-tree-node__vline absolute w-px bg-gray-300"
                  style={{
                    height: `${NODE_HEIGHT * getChildren(treeNode).length}px`,
                    left: `${NODE_INDENT * (treeNode.level - 1) + 12}px`,
                    top: `${NODE_HEIGHT}px`,
                  }}
                ></span>
              )}
              {/** 折叠图标 */}
              {treeNode.isLeaf ? (
                <span style={{ display: "inline-block", width: "25px" }}></span>
              ) : slots.icon ? (
                slots.icon({ nodeData: treeNode, toggleNode })
              ) : (
                <svg
                  onClick={() => toggleNode(treeNode)}
                  style={{
                    width: "25px",
                    height: "15px",
                    display: "inline-block",
                    cursor: "pointer",
                    transform: treeNode.expanded ? "rotate(90deg)" : "",
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M384 192v640l384-320.064z"
                  ></path>
                </svg>
              )}
              {/* 复选框 */}
              {checkable.value && (
                <input
                  type="checkbox"
                  v-model={treeNode.checked}
                  onClick={() => toggleCheckNode(treeNode)}
                ></input>
              )}
              {/* 内容 */}
              {slots.content ? slots.content(treeNode) : treeNode.label}
            </div>
          ))}
        </div>
      );
    };
  },
});
