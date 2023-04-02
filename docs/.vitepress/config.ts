import { demoBlockPlugin } from "vitepress-theme-demoblock";
const sidebar = {
  "/": [
    {
      text: "通用",
      items: [{ text: "Button 按钮", link: "/components/button/" }],
    },
    { text: "导航", items: [] },
    {
      text: "反馈",
      items: [{ text: "Pagination 分页", link: "/components/pagination/" }],
    },
    { text: "数据录入", items: [] },
    {
      text: "数据展示",
      items: [
        {
          text: "Tree 树",
          link: "/components/tree/",
        },
      ],
    },
    { text: "布局", items: [] },
  ],
};
const config = {
  title: "simple-ui",
  themeConfig: {
    sidebar,
  },
  markdown: {
    config: (md) => {
      // 添加DemoBlock插槽
      // const { demoBlockPlugin } = require("vitepress-theme-demoblock");
      md.use(demoBlockPlugin, {
        scriptReplaces: [
          {
            searchValue: /import { ref } from "vue";/g,
            replaceValue: "const { ref } = Vue;",
          },
        ],
      });
    },
  },
};
export default config;
