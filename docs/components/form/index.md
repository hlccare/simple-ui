# 表单

:::demo

```vue
<template>
  <s-form :model="model" layout="horizontal">
    <s-form-item label="用户名">
      <input />
      {{ model }}
    </s-form-item>
  </s-form>
</template>
<script setup>
import { ref } from "vue";
const model = ref({
  user: "Kirin",
});
</script>
```

:::
