# 树

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
