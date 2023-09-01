# 虚拟列表

## 基本用法

提供`data`及设置`itemHeight`，默认插槽为作用域插槽
:::demo

```vue
<template>
  <div style="height: 300px">
    <SVirtualList :data="data" :itemHeight="24">
      <template v-slot="{ item }">
        <div style="height: 24px">{{ item }}</div>
      </template>
    </SVirtualList>
  </div>
</template>
<script setup>
import { ref } from "vue";

const data = ref([...Array(500).keys()]);
</script>
```

:::
