# 表单

### 基础用法

设置`model`为数据模型

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

### 表单布局

`horizontal`布局下，可设置` label-size``label-align `

:::demo

```vue
<template>
  <p>
    <span style="font-size:14px">labelSize:</span>
    <label>
      <input type="radio" value="sm" v-model="labelSize" />
      sm
    </label>
    <label>
      <input type="radio" value="md" v-model="labelSize" />
      md
    </label>
    <label>
      <input type="radio" value="lg" v-model="labelSize" />
      lg
    </label>
  </p>
  <p>
    <span style="font-size:14px">labelAlign:</span>
    <label>
      <input type="radio" value="start" v-model="labelAlign" />
      start
    </label>
    <label>
      <input type="radio" value="center" v-model="labelAlign" />
      center
    </label>
    <label>
      <input type="radio" value="end" v-model="labelAlign" />
      end
    </label>
  </p>
  <s-form
    :model="model"
    layout="horizontal"
    :labelAlign="labelAlign"
    :labelSize="labelSize"
  >
    <s-form-item label="用户名：">
      <input v-model="model.user" />
    </s-form-item>
    <s-form-item label="密码：">
      <input type="password" v-model="model.password" />
    </s-form-item>
  </s-form>
  {{ model }}
</template>
<script setup>
import { ref } from "vue";

const model = ref({
  user: "kirin",
  password: "123456",
});
const labelSize = ref("md");
const labelAlign = ref("start");
</script>
```

:::

### 表单校验

通过`rules`设置表单校验规则，监听`submit`事件进行表单提交

:::demo

```vue
<template>
  <s-form
    :model="model"
    :rules="rules"
    layout="horizontal"
    @submit="onLogin"
    ref="loginForm"
  >
    <s-form-item label="用户名：" field="user">
      <s-input v-model="model.user" />
    </s-form-item>
    <s-form-item label="密码：" field="pwd">
      <s-input type="password" v-model="model.pwd" />
    </s-form-item>
    <s-form-item>
      <SButton>登录</SButton>
    </s-form-item>
  </s-form>
</template>
<script setup>
import { ref } from "vue";

const model = ref({
  user: "",
  pwd: "",
});
const rules = ref({
  user: [{ required: true, message: "用户名为必填项" }],
  pwd: [{ required: true, message: "密码为必填项" }],
});

const loginForm = ref(null);
const onLogin = () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      alert("登录成功");
    } else {
      alert("校验失败，请重试！");
    }
  });
};
</script>
```

:::
