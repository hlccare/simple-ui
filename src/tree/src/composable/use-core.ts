import { computed, Ref } from "vue";
import { IInnerTreeNode } from "../tree-type";
import { IUseCore } from "./use-tree-types";

export const useCore = (innerData: Ref<IInnerTreeNode[]>): IUseCore => {
  // 获取展开的节点列表
  const expandedTree = computed(() => {
    let excludedNodes: IInnerTreeNode[] = [];
    const result: IInnerTreeNode[] = [];

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
  const getChildren = (node: IInnerTreeNode, recursive = false) => {
    const result: Array<IInnerTreeNode> = [];
    const startIndex = innerData.value.findIndex((item) => item.id === node.id);
    for (
      let i = startIndex + 1;
      i < innerData.value.length && node.level < innerData.value[i].level;
      i++
    ) {
      if (recursive) {
        result.push(innerData.value[i]);
      } else if (node.level === innerData.value[i].level - 1) {
        // 直接子节点
        result.push(innerData.value[i]);
      }
    }
    return result;
  };
  const getIndex = (node: IInnerTreeNode) => {
    if (!node) return -1;
    return innerData.value.findIndex((item) => item.id === node.id);
  };

  const getNode = (node: IInnerTreeNode) => {
    return innerData.value.find((item) => item.id === node.id);
  };
  return {
    getChildren,
    expandedTree,
    getIndex,
    getNode,
  };
};
