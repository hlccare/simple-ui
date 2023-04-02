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
                loading: () =>
                  slots.loading ? (
                    slots.loading({ nodeData: treeData })
                  ) : (
                    <span class="ml-1">
                      <svg
                        class="rotating-icon"
                        height="16"
                        width="16"
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        style="display:inline-block"
                      >
                        <path
                          fill="currentColor"
                          d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
                        ></path>
                      </svg>
                    </span>
                  ),
              }}
            </STreeNode>
          ))}
        </div>
      );
    };
  },
});
