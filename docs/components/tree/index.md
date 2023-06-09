# 树

## 基本用法

通过`data`属性设置数据
:::demo

```vue
<template>
  <STree :data="data"></STree>
</template>
<script setup>
import { ref } from "vue";

const data = ref([
  {
    label: "docs",
    id: "docs",
  },
  {
    label: "packages",
    id: "packages",
    expanded: true,
    children: [
      {
        label: "plugin-vue",
        id: "plugin-vue",
      },
      {
        label: "vite",
        id: "vite",
        expanded: true,
        children: [
          {
            label: "src",
            id: "src",
          },
          {
            label: "README.md",
            id: "README.md",
          },
        ],
      },
    ],
  },
  {
    label: "scripts",
    id: "scripts",
    expanded: true,
    children: [
      {
        label: "release.ts",
        id: "release.ts",
      },
      {
        label: "verifyCommit.ts",
        id: "verifyCommit.ts",
      },
    ],
  },
  {
    label: "pnpm-workspace.yaml",
    id: "pnpm-workspace.yaml",
  },
]);
</script>
```

:::

## 基本用法

通过`checkable`属性设置是否可勾选

:::demo

```vue
<template>
  <STree :data="data" checkable></STree>
</template>
<script setup>
import { ref } from "vue";

const data = ref([
  {
    label: "docs",
    id: "docs",
    checked: true,
  },
  {
    label: "packages",
    id: "packages",
    expanded: true,
    children: [
      {
        label: "plugin-vue",
        id: "plugin-vue",
      },
      {
        label: "vite",
        id: "vite",
        expanded: true,
        children: [
          {
            label: "src",
            id: "src",
          },
          {
            label: "README.md",
            id: "README.md",
          },
        ],
      },
    ],
  },
  {
    label: "scripts",
    id: "scripts",
    expanded: true,
    children: [
      {
        label: "release.ts",
        id: "release.ts",
      },
      {
        label: "verifyCommit.ts",
        id: "verifyCommit.ts",
      },
    ],
  },
  {
    label: "pnpm-workspace.yaml",
    id: "pnpm-workspace.yaml",
  },
]);
</script>
```

:::

## 内容插槽

通过`content`插槽自定义显示内容

:::demo

```vue
<template>
  <STree :data="data">
    <template #content="treeNode">
      <svg
        v-if="treeNode.isLeaf"
        id="octicon_file_16"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="#57606a"
        style="display:inline-block"
      >
        <path
          fill-rule="evenodd"
          d="M3.75 1.5a.25.25 0 00-.25.25v11.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25V6H9.75A1.75 1.75 0 018 4.25V1.5H3.75zm5.75.56v2.19c0 .138.112.25.25.25h2.19L9.5 2.06zM2 1.75C2 .784 2.784 0 3.75 0h5.086c.464 0 .909.184 1.237.513l3.414 3.414c.329.328.513.773.513 1.237v8.086A1.75 1.75 0 0112.25 15h-8.5A1.75 1.75 0 012 13.25V1.75z"
        ></path>
      </svg>
      <svg
        v-else
        id="octicon_file-directory-fill_16"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="#54aeff"
        style="display:inline-block"
      >
        <path
          d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z"
        ></path>
      </svg>
      {{ treeNode.label }}
      <svg
        v-if="treeNode.isLeaf"
        title="modified"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="#9a6700"
        style="position: absolute; right: 0; top: 8px;"
      >
        <path
          fill-rule="evenodd"
          d="M2.75 2.5h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75a.25.25 0 01.25-.25zM13.25 1H2.75A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1zM8 10a2 2 0 100-4 2 2 0 000 4z"
        ></path>
      </svg>
    </template>
  </STree>
</template>
<script setup>
import { ref } from "vue";

const data = ref([
  {
    label: "docs",
    id: "docs",
    checked: true,
  },
  {
    label: "packages",
    id: "packages",
    expanded: true,
    children: [
      {
        label: "plugin-vue",
        id: "plugin-vue",
      },
      {
        label: "vite",
        id: "vite",
        expanded: true,
        children: [
          {
            label: "src",
            id: "src",
          },
          {
            label: "README.md",
            id: "README.md",
          },
        ],
      },
    ],
  },
  {
    label: "scripts",
    id: "scripts",
    expanded: true,
    children: [
      {
        label: "release.ts",
        id: "release.ts",
      },
      {
        label: "verifyCommit.ts",
        id: "verifyCommit.ts",
      },
    ],
  },
  {
    label: "pnpm-workspace.yaml",
    id: "pnpm-workspace.yaml",
  },
]);
</script>
```

:::

### 操作节点

设置`operable`，显示条目的操作按钮

:::demo

```vue
<template>
  <STree :data="data" operable></STree>
</template>
<script setup>
import { ref } from "vue";

const data = ref([
  {
    label: "node 1",
    id: "node-1",
    children: [
      {
        label: "node 1-1",
        id: "node-1-1",
      },
    ],
  },
  {
    label: "node 2",
    id: "node-2",
  },
]);
</script>
```

:::

### 节点懒加载

通过`lazy-load`事件来进行节点内容懒加载

:::demo

```vue
<template>
  <s-tree :data="data" @lazy-load="lazyLoad"></s-tree>
</template>
<script setup>
import { ref } from "vue";

const data = ref([
  {
    id: "node-1",
    label: "node-1",
    children: [
      {
        id: "node-1-1",
        label: "node 1-1 - dynamic loading",
        isLeaf: false,
      },
      {
        id: "node 1-2",
        label: "node 1-2",
      },
    ],
  },
  {
    id: "node-2",
    label: "node 2 - dynamic loading",
    isLeaf: false,
  },
]);

const lazyLoad = (node, callback) => {
  setTimeout(() => {
    const data = [
      {
        label: "lazy node 1",
        expanded: true,
        children: [
          {
            id: "lazy node 1-1",
            label: "lazy node 1-1",
          },
          {
            id: "lazy node 1-2",
            label: "lazy node 1-2",
          },
        ],
      },
      {
        id: "lazy node 2",
        label: "lazy node 2",
      },
    ];
    callback({
      treeItems: data,
      node,
    });
  }, 1000);
};
</script>
```

:::

## 虚拟滚动

通过`height`开启虚拟滚动，通过`itemHeight`设置项目高度
:::demo

```vue
<template>
  <s-tree :data="data" :height="300"></s-tree>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const data = ref([
      ...Array.from({ length: 1000 }).map((_, index) => ({
        id: "node " + index,
        label: "node " + index,
      })),
    ]);

    return {
      data,
    };
  },
});
</script>
```
