import { defineComponent, provide, SetupContext, toRefs } from "vue";
import useTree from "./composable/use-tree";
import { TreeProps, treeProps } from "./tree-type";
import STreeNode from "./components/tree-node";
import STreeNodeToggle from "./components/tree-node-toggle";

export default defineComponent({
  name: "STree",
  props: treeProps,
  emits: ["lazy-load"],
  setup(props: TreeProps, context: SetupContext) {
    const { data } = toRefs(props);
    const { slots } = context;
    const treeData = useTree(data, context);
    provide("TREE_UTILS", treeData);
    return () => {
      return (
        <div class="s-tree">
          {treeData.expandedTree.value.map((treeNode) => (
            <STreeNode {...props} treeNode={treeNode}>
              {{
                content: () =>
                  slots.content ? slots.content(treeNode) : treeNode.label,
                icon: () =>
                  slots.icon ? (
                    slots.icon({
                      nodeData: treeNode,
                      toggleNode: treeData.toggleNode,
                    })
                  ) : (
                    <STreeNodeToggle
                      expanded={treeNode.expanded}
                      onClick={() => treeData.toggleNode(treeNode)}
                    ></STreeNodeToggle>
                  ),
              }}
            </STreeNode>
          ))}
        </div>
      );
    };
  },
});
