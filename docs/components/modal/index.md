# 模态框

:::demo

```vue
<template>
  <s-button @click="open">打开模态框</s-button>

  <s-modal v-model="visible" title="小贴士" center alignCenter>
    <span>这是一条消息！</span>
    <template #footer>
      <div class="dialog-footer">
        <s-button style="margin-right: 12px;" @click="visible = false"
          >取消</s-button
        >
        <s-button @click="visible = false">确定</s-button>
      </div>
    </template>
  </s-modal>
</template>
<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const visible = ref(false);

    const open = () => {
      visible.value = true;
    };

    return {
      visible,
      open,
    };
  },
});
</script>

<style>
.dialog-footer {
  padding: 20px;
  text-align: right;
}
</style>
```

:::
