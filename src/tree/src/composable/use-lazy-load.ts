import { IUseCore, IUseLazyLoad, LazyNodeResult } from "./use-tree-types";
import { IInnerTreeNode } from "../tree-type";
import { ref, Ref, SetupContext } from "vue";
import generateInnerTree from "../utils";
export const useLazyLoad = (
  innerData: Ref<IInnerTreeNode[]>,
  { getNode, getIndex, getChildren }: IUseCore,
  { emit }: SetupContext
): IUseLazyLoad => {
  // 接受父节点，派发时间，外部调用异步方法获取数据，传入回调函数
  const lazyLoadNodes = (node: IInnerTreeNode) => {
    const innerNode = getNode(node);
    // 判断是否需要加载节点，节点存在且非叶子节点
    if (innerNode && innerNode.isLeaf === false && !innerNode.childNodeCount) {
      innerNode.loading = true;
      emit("lazy-load", node, dealChildNodes);
    }
  };

  // 用户获取子节点数据之后的回调函数
  const dealChildNodes = (result: LazyNodeResult) => {
    const node = getNode(result.node);
    if (node) {
      node.loading = false;
      // 子节点数据处理
      const childNodes = ref(
        generateInnerTree(result.treeItems, node.level + 1)
      );
      setParent(node, childNodes);
      // 插入父节点后
      insertChildren(node, childNodes);

      // 更新父节点孩子数量
      const children = getChildren(node);
      node.childNodeCount = children.length;
    }
  };

  // 设置子节点parentId
  const setParent = (
    node: IInnerTreeNode,
    childNodes: Ref<IInnerTreeNode[]>
  ) => {
    // 需判断层级关系和parentId是否为空
    childNodes.value.forEach((item) => {
      if (item.level - 1 === node.level && !item.parentId) {
        item.parentId = node.id;
      }
    });
  };

  // 在父节点后增加子节点
  const insertChildren = (
    parent: IInnerTreeNode,
    nodes: Ref<IInnerTreeNode[]>
  ) => {
    const parentIndex = getIndex(parent);
    if (parentIndex > -1) {
      innerData.value.splice(parentIndex + 1, 0, ...nodes.value);
    }
  };
  return {
    lazyLoadNodes,
  };
};
