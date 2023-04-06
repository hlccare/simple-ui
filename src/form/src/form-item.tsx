import {
  ComputedRef,
  computed,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
} from "vue";
import { FormItemProps, LabelData, formItemProps } from "./form-item-type";
import { formContextToken } from "./form-type";
import Validator from "async-validator";
export default defineComponent({
  name: "SFormItem",
  props: formItemProps,
  setup(props: FormItemProps, { slots }) {
    // 注入label相关数据
    const labelData = inject("LABEL_DATA") as ComputedRef<LabelData>;
    const itemClasses = computed(() => ({
      "s-form__item": true,
      "s-form__item--horizontal": labelData.value.layout === "horizontal",
      "s-form__item--vertical": labelData.value.layout === "vertical",
    }));
    // label的class数据
    const labelClasses = computed(() => ({
      "s-form__label": true,
      "s-form__label--vertical": labelData.value.layout === "vertical",
      [`s-form__label--${labelData.value.labelAlign}`]:
        labelData.value.layout === "horizontal",
      [`s-form__label--${labelData.value.labelSize}`]:
        labelData.value.layout === "horizontal",
    }));
    // 注入表单校验相关数据
    const formCtx = inject(formContextToken);
    const showErrorMessage = ref(false);
    const errorMessage = ref("");
    const validate = () => {
      let errorMsg = "";
      // 无表单校验相关数据，说明未在Form组件中使用
      if (!formCtx) {
        errorMsg = "请在Form组件中使用FormItem";
        console.warn(errorMsg);
        return Promise.reject(errorMsg);
      }
      // 无field字段，说明无需校验
      if (!props.field) {
        errorMsg = "如果要校验当前项，请设置field字段";
        console.warn(errorMsg);
        return Promise.reject(errorMsg);
      }
      // 表单无rules，则直接通过校验
      if (!formCtx.rules) {
        return Promise.resolve({ result: true });
      }
      // 表单有rules，根据field字段获取对应的校验规则
      const itemRules = formCtx.rules[props.field] || undefined;
      // 校验规则为空，则默认通过
      if (!itemRules) {
        return Promise.resolve({ result: true });
      }
      // 需要校验的情况
      const value = formCtx.model[props.field];
      // 创建校验器实例
      const validator = new Validator({
        [props.field]: itemRules,
      });
      return validator.validate({ [props.field]: value }, (errors) => {
        if (errors) {
          // 校验失败，现实错误信息
          showErrorMessage.value = true;
          errorMessage.value = errors[0].message || "校验错误";
        } else {
          showErrorMessage.value = false;
          errorMessage.value = "";
        }
      });
    };
    const formItemCtx = {
      validate,
    };
    // 提供的该formItem的校验方法
    provide("FORM_ITEM_CTX", formItemCtx);
    // 挂载时，若有field，将当前项添加至表单需校验项
    onMounted(() => {
      if (props.field) {
        formCtx?.addItem(formItemCtx);
      }
    });
    // 卸载时，将当前项从需校验项中移除
    onUnmounted(() => {
      formCtx?.removeItem(formItemCtx);
    });
    return () => (
      <div class={itemClasses.value}>
        {/* label */}
        <span class={labelClasses.value}>{props.label}</span>
        <div>
          {/* 控件 */}
          {slots.default?.()}
          {/* 错误信息 */}
          {showErrorMessage.value && (
            <div class="error-message">{errorMessage.value}</div>
          )}
        </div>
      </div>
    );
  },
});
