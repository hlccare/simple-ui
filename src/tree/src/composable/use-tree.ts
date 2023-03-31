import { computed, Ref, ref, unref } from "vue";
import generateInnerTree from "../utils";
import { IInnerTreeNode, ITreeNode } from "./../tree-type";
const useTree = (node: Ref<ITreeNode[]> | ITreeNode[]) => {
  const innerData = ref(generateInnerTree(unref(node)));
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
    const startIndex = innerData.value.findIndex((item) => item.id === node.id);
    for (
      let i = startIndex + 1;
      i < innerData.value.length && node.level < innerData.value[i].level;
      i++
    ) {
      result.push(innerData.value[i]);
    }
    return result;
  };
  return {
    innerData,
    toggleNode,
    expandedTree,
    getChildren,
  };
};

export default useTree;
