import { ExtractPropTypes, PropType } from "vue";

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    required: true,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  operable: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
  },
  itemHeight: {
    type: Number,
    default: 30,
  },
} as const;

export type TreeProps = ExtractPropTypes<typeof treeProps>;

export interface ITreeNode {
  label: string;
  id?: string;
  children?: ITreeNode[];

  selected?: boolean; // 点击选中
  checked?: boolean; // 勾选
  expanded?: boolean; // 展开

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
}

//因为嵌套结构需要通过递归的方式来操作，编码不方便而且很难使用虚拟滚动来做性能优化
//设计一个扁平的数据结构IInnerTreeNode，将树的嵌套数据结构拍平成一个扁平的数组
export interface IInnerTreeNode extends ITreeNode {
  parentId?: string; // 父节点ID
  level: number; // 节点层级
  isLeaf?: boolean; // 是否叶子结点
  loading?: boolean; //节点是否显示加载中
  childNodeCount?: number; //该节点子节点数量
}
