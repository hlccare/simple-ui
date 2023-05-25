import { IUseCore, IUseLazyLoad, IUserCheck } from "./use-tree-types";
import { IInnerTreeNode } from "../tree-type";
import { Ref, SetupContext } from "vue";
export const useCheck = (
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  lazyLoad: IUseLazyLoad
): IUserCheck => {
  const toggleCheckNode = (node: IInnerTreeNode) => {
    node.checked = !node.checked;
    // 父子联动
    // 更新子节点选中状态与父节点一致
    core.getChildren(node, true).forEach((child) => {
      child.checked = node.checked;
    });
    // 子父联动
    // 获取父节点
    const parentNode = innerData.value.find(
      (item) => item.id === node.parentId
    );
    if (!parentNode) return;
    const siblingNodes = core.getChildren(parentNode, false);
    const checkedSiblingNodes = siblingNodes.filter((item) => item.checked);
    if (checkedSiblingNodes.length === siblingNodes.length) {
      // 所有兄弟节点均选中，父节点则选中
      parentNode.checked = true;
    }
  };
  return {
    toggleCheckNode,
  };
};
