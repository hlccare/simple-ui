import { IInnerTreeNode, ITreeNode } from "./tree-type";
const generateInnerTree = (
  tree: ITreeNode[],
  level = 1, // 当前节点层级
  path = [] as IInnerTreeNode[] // 递归路径，用于判断父节点
): IInnerTreeNode[] => {
  return tree.reduce((pre, cur) => {
    const o = { ...cur, level } as IInnerTreeNode;
    // 根据path,计算parentId
    if (path.length) {
      o.parentId = path[path.length - 1].id;
    }
    // 有children则递归调用
    if (o.children) {
      const children = generateInnerTree(cur.children, level + 1, [...path, o]);
      delete o.children;
      return pre.concat(o, children);
    } else {
      // 叶子节点
      o.isLeaf = true;
      return pre.concat(o);
    }
  }, [] as IInnerTreeNode[]);
};

export default generateInnerTree;
