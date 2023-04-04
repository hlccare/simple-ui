# 分页

:::demo

```vue
<template>
  <s-pagination :total="50"></s-pagination>
</template>
```

:::

:::demo

```vue
<template>
  <div>
    <ul>
      <li v-for="article of articles">
        <span class="title">{{ article.title }}</span>
      </li>
    </ul>
  </div>
  <!-- 使用 Pagination 对文章进行分页-->
  <SPagination
    :total="sourceArticles.length"
    :pageSize="pageSize"
    v-model="pageIndex"
  />
</template>
<script setup>
import { ref, computed, watch, onMounted } from "vue";
const sourceArticles = ref([
  {
    title: "条目1", // 标题
  },
  {
    title: "条目2", // 标题
  },
  {
    title: "条目3", // 标题
  },
  {
    title: "条目4", // 标题
  },
  {
    title: "条目5", // 标题
  },
]);

const pageIndex = ref(1);
const pageSize = ref(2);

const articles = computed(() => {
  return sourceArticles.value.slice(
    (pageIndex.value - 1) * pageSize.value,
    pageIndex.value * pageSize.value
  );
});
</script>
```

:::
