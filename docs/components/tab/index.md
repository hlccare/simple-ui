# tabs

:::demo

```vue
<template>
  <s-tabs v-model="activeTab">
    <s-tab id="tab1" title="Tab1">Tab1 Content</s-tab>
    <s-tab id="tab2" title="Tab2">Tab2 Content</s-tab>
    <s-tab id="tab3" title="Tab3">Tab3 Content</s-tab>
  </s-tabs>
</template>
<script setup>
import { ref } from "vue";

const activeTab = ref("tab1");
</script>
```

:::

:::demo

```vue
<template>
  <s-tabs v-model="activeTab" closable addable>
    <s-tab id="tab1" title="Tab1">Tab1 Content</s-tab>
    <s-tab id="tab2" title="Tab2">Tab2 Content</s-tab>
    <s-tab id="tab3" title="Tab3">Tab3 Content</s-tab>
  </s-tabs>
</template>
<script setup>
import { ref } from "vue";

const activeTab = ref("tab1");
</script>
```

:::
