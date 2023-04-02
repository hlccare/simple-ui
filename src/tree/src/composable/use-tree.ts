import { useLazyLoad } from "./use-lazy-load";
import {
  IUserCheck,
  IUserOperate,
  IUserToggle,
  TreeUtils,
} from "./use-tree-types";
import { Ref, ref, SetupContext, unref } from "vue";
import generateInnerTree from "../utils";
import { IInnerTreeNode, ITreeNode } from "./../tree-type";
import { useCheck } from "./use-check";
import { useCore } from "./use-core";
import { useOperate } from "./use-operate";
import { useToggle } from "./use-toggle";

const useTree = (
  node: Ref<ITreeNode[]> | ITreeNode[],
  context: SetupContext
): TreeUtils => {
  const innerData: Ref<IInnerTreeNode[]> = ref(generateInnerTree(unref(node)));

  const core = useCore(innerData);
  const plugins = [useToggle, useCheck, useOperate];

  const lazyLoad = useLazyLoad(innerData, core, context);

  // 聚合除core以外的方法
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin(innerData, core, context, lazyLoad),
    };
  }, {} as IUserCheck & IUserOperate & IUserToggle);

  return {
    ...pluginMethods,
    ...core,
    treeData: innerData,
  };
};

export default useTree;
