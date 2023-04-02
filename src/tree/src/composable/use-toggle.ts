import { IUseCore, IUserToggle } from "./use-tree-types";
import { IInnerTreeNode } from "./../tree-type";
import { Ref } from "vue";
export const useToggle = (
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore
): IUserToggle => {
  const toggleNode = (node: IInnerTreeNode) => {
    // 在原始列表中获取该节点
    const cur = innerData.value.find((item) => item.id === node.id);
    if (cur) {
      cur.expanded = !cur.expanded;
    }
  };
  return {
    toggleNode,
  };
};
