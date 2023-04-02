import { ITreeNode } from "./../tree-type";
import { ComputedRef, Ref } from "vue";
import { IInnerTreeNode } from "../tree-type";

export type IUseCore = {
  getChildren: (
    treeNode: IInnerTreeNode,
    recursive?: boolean
  ) => IInnerTreeNode[];
  getIndex: (node: IInnerTreeNode) => number;
  expandedTree: ComputedRef<IInnerTreeNode[]>;
  getNode: (node: IInnerTreeNode) => IInnerTreeNode | undefined;
};

export type IUserToggle = {
  toggleNode: (treeNode: IInnerTreeNode) => void;
};

export type IUserCheck = {
  toggleCheckNode: (treeNode: IInnerTreeNode) => void;
};

export type IUserOperate = {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void;
  remove: (treeNode: IInnerTreeNode) => void;
};

export type IUseLazyLoad = {
  lazyLoadNodes: (node: IInnerTreeNode) => void;
};

export type LazyNodeResult = {
  node: IInnerTreeNode;
  treeItems: ITreeNode[]; // 未拍平的数据
};

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>;
} & IUseCore &
  IUserToggle &
  IUserCheck &
  IUserOperate;
