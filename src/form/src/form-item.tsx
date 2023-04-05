import {
  ComputedRef,
  computed,
  defineComponent,
  inject,
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
    const labelData = inject("LABEL_DATA") as ComputedRef<LabelData>;
    const itemClasses = computed(() => ({
      "s-form__item": true,
      "s-form__item--horizontal": labelData.value.layout === "horizontal",
      "s-form__item--vertical": labelData.value.layout === "vertical",
    }));
    const labelClasses = computed(() => ({
      "s-form__label": true,
      "s-form__label--vertical": labelData.value.layout === "vertical",
      [`s-form__label--${labelData.value.labelAlign}`]:
        labelData.value.layout === "horizontal",
      [`s-form__label--${labelData.value.labelSize}`]:
        labelData.value.layout === "horizontal",
    }));

    const formCtx = inject(formContextToken);
    const showErrorMessage = ref(false);
    const errorMessage = ref("");
    const validate = () => {
      let errorMsg;
      if (!formCtx) {
        errorMsg = "请在Form组件中使用FormItem";
        console.warn(errorMsg);
        return Promise.reject(errorMsg);
      }
      if (!props.field) {
        errorMsg = "如果要校验当前项，请设置field字段";
        console.warn(errorMsg);
        return Promise.reject(errorMsg);
      }
      if (!formCtx.rules) {
        return Promise.resolve({ result: true });
      }
      const itemRules = formCtx.rules[props.field] || undefined;
      if (!itemRules) {
        return Promise.resolve({ result: true });
      }

      const value = formCtx.model[props.field];
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
    provide("FORM_ITEM_CTX", {
      validate,
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
