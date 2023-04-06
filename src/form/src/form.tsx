import { computed, defineComponent, provide } from "vue";
import { FormProps, formContextToken, formProps } from "./form-type";
import { FormItemContext } from "./form-item-type";
import { Value } from "async-validator";

export default defineComponent({
  name: "SForm",
  props: formProps,
  emits: ["submit"],
  setup(props: FormProps, { slots, emit, expose }) {
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign,
    }));
    // 提供label相关数据
    provide("LABEL_DATA", labelData);

    // 需要校验的表单项
    const formItems = new Set<FormItemContext>();
    const addItem = (item: FormItemContext) => formItems.add(item);
    const removeItem = (item: FormItemContext) => formItems.delete(item);
    // 提供表单校验相关数据
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
      addItem,
      removeItem,
    });
    const submit = (e: Event) => {
      e.preventDefault();
      emit("submit");
    };
    // 总体校验方法
    const validate = (callback: (valid: boolean) => void) => {
      const tasks: Array<Promise<Value>> = [];
      // 遍历需要检验的表单项
      formItems.forEach((item) => tasks.push(item.validate()));
      Promise.all(tasks)
        .then(() => callback(true))
        .catch(() => callback(false));
    };
    // 向外暴露校验方法
    expose({
      validate,
    });
    return () => {
      return (
        <form class="s-form" onSubmit={submit}>
          {slots.default()}
        </form>
      );
    };
  },
});
