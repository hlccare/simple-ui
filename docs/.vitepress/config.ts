import { demoBlockPlugin } from "vitepress-theme-demoblock";
const sidebar = {
  "/": [
    {
      text: "通用",
      items: [{ text: "Button 按钮", link: "/components/button/" }],
    },
    {
      text: "导航",
      items: [{ text: "Tabs 标签页", link: "/components/tab/" }],
    },
    {
      text: "反馈",
      items: [
        { text: "Pagination 分页", link: "/components/pagination/" },
        {
          text: "Modal 模态框",
          link: "/components/modal/",
        },
        {
          text: "Popover 弹出框",
          link: "/components/popover/",
        },
      ],
    },
    {
      text: "数据录入",
      items: [
        {
          text: "Form 表单",
          link: "/components/form/",
        },
      ],
    },
    {
      text: "数据展示",
      items: [
        {
          text: "Tree 树",
          link: "/components/tree/",
        },
        {
          text: "VirtualList 虚拟列表",
          link: "/components/virtual-list/",
        },
      ],
    },
  ],
};
const config = {
  title: "simple-ui",
  base: "/simple-ui-website/",
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
            searchValue: /import ({.*}) from "vue"/g,
            replaceValue: (s, s1) => `const ${s1} = Vue`,
          },
        ],
      });
    },
  },
};
export default config;
