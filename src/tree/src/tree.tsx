import { defineComponent, toRefs } from "vue";
import useTree from "./composable/use-tree";
import { TreeProps, treeProps } from "./tree-type";

const NODE_HEIGHT = 28;
const NODE_INDENT = 24;

export default defineComponent({
  name: "STree",
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props);
    const innerData = ref(generateInnerTree(data.value));
    const toggleNode = (node: IInnerTreeNode) => {
      // 在原始列表中获取该节点
      const cur = innerData.value.find((item) => item.id === node.id);
      if (cur) {
        cur.expanded = !cur.expanded;
      }
    };
    // 获取展开的节点列表
    const expandedTree = computed(() => {
      let excludedNodes: IInnerTreeNode[] = [];
      const result = [];

      // 遍历列表，找出折叠的
      for (const item of innerData.value) {
        if (excludedNodes.includes(item)) {
          continue;
        }
        if (!item.expanded) {
          excludedNodes = [...excludedNodes, ...getChildren(item)];
        }
        result.push(item);
      }
      return result;
    });
    const getChildren = (node: IInnerTreeNode) => {
      const result: Array<IInnerTreeNode> = [];
      const startIndex = innerData.value.findIndex(
        (item) => item.id === node.id
      );
      for (
        let i = startIndex + 1;
        i < innerData.value.length && node.level < innerData.value[i].level;
        i++
      ) {
        result.push(innerData.value[i]);
      }
      return result;
    };
    const { expandedTree, toggleNode, getChildren } = useTree(data);
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
              {treeNode.label}
            </div>
          ))}
        </div>
      );
    };
  },
});
