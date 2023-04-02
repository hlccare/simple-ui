import { ComputedRef, Ref } from "vue";
import { IInnerTreeNode } from "../tree-type";

export type IUseCore = {
  getChildren: (
    treeNode: IInnerTreeNode,
    recursive?: boolean
  ) => IInnerTreeNode[];
  getIndex: (node: IInnerTreeNode) => number;
  expandedTree: ComputedRef<IInnerTreeNode[]>;
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

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>;
} & IUseCore &
  IUserToggle &
  IUserCheck &
  IUserOperate;
