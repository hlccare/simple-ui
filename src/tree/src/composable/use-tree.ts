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
  const toggleCheckNode = (node: IInnerTreeNode) => {
    node.checked = !node.checked;
    // 父子联动
    // 更新子节点选中状态与父节点一致
    getChildren(node).forEach((child) => {
      child.checked = node.checked;
    });
    // 子父联动
    // 获取父节点
    const parentNode = innerData.value.find(
      (item) => item.id === node.parentId
    );
    if (!parentNode) return;
    const siblingNodes = getChildren(parentNode, false);
    const checkedSiblingNodes = siblingNodes.filter((item) => item.checked);
    if (checkedSiblingNodes.length === siblingNodes.length) {
      // 所有兄弟节点均选中，父节点则选中
      parentNode.checked = true;
    }
  };
  return {
    innerData,
    toggleNode,
    expandedTree,
    getChildren,
    toggleCheckNode,
  };
};

export default useTree;
