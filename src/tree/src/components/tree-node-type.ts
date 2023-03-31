import { IInnerTreeNode } from "./../tree-type";
import { ExtractPropTypes, PropType } from "vue";
import { treeProps } from "../tree-type";

export const treeNodeProps = {
  ...treeProps,
  treeNode: {
    type: Object as PropType<IInnerTreeNode>,
    require: true,
  },
} as const;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
