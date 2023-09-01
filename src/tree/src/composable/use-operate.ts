import { IUseCore, IUseLazyLoad, IUserOperate } from "./use-tree-types";
import { IInnerTreeNode } from "../tree-type";
import { ref, Ref, SetupContext } from "vue";
import { randomId } from "../../../shared/utils";
export const useOperate = (
  innerData: Ref<IInnerTreeNode[]>,
  core: IUseCore,
  context: SetupContext,
  lazyLoad: IUseLazyLoad
): IUserOperate => {
  const append = (parent: IInnerTreeNode, node: IInnerTreeNode) => {
    const children = core.getChildren(parent, false);
    const lastChild = children[children.length - 1];
    let insertedIndex = core.getIndex(parent) + 1;
    if (lastChild) {
      insertedIndex = core.getIndex(lastChild) + 1;
    }
    // parent节点设置展开，且非叶子节点
    parent.expanded = true;
    parent.isLeaf = false;
    parent.childNodeCount = parent.childNodeCount
      ? parent.childNodeCount + 1
      : 1;

    // 新增节点初始化
    const currentNode = ref({
      ...node,
      level: parent.level + 1,
      parentId: parent.id,
      isLeaf: true,
    });

    // 设置新增节点ID
    if (currentNode.value.id === undefined) {
      currentNode.value.id = randomId();
    }

    // 插入
    innerData.value.splice(insertedIndex, 0, currentNode.value);
  };

  const remove = (node: IInnerTreeNode) => {
    const childrenIds = core.getChildren(node).map((item) => item.id);
    // 过滤掉该节点及其子节点
    innerData.value = innerData.value.filter(
      (item) => ![...childrenIds, node.id].includes(item.id)
    );
  };
  return {
    append,
    remove,
  };
};
