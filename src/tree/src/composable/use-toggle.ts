import { IUseCore, IUseLazyLoad, IUserToggle } from "./use-tree-types";
import { IInnerTreeNode } from "./../tree-type";
import { Ref, SetupContext } from "vue";
export const useToggle = (
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  lazyLoad: IUseLazyLoad
): IUserToggle => {
  const toggleNode = (node: IInnerTreeNode) => {
    // 在原始列表中获取该节点
    const cur = innerData.value.find((item) => item.id === node.id);
    if (cur) {
      cur.expanded = !cur.expanded;
      if (cur.expanded) {
        lazyLoad.lazyLoadNodes(cur);
      }
    }
  };
  return {
    toggleNode,
  };
};
