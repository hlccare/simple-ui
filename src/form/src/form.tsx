import { computed, defineComponent, provide } from "vue";
import { FormProps, formContextToken, formProps } from "./form-type";
export default defineComponent({
  name: "SForm",
  props: formProps,
  setup(props: FormProps, { slots }) {
    const labelData = computed(() => ({
      layout: props.layout,
      labelSize: props.labelSize,
      labelAlign: props.labelAlign,
    }));
    provide("LABEL_DATA", labelData);
    provide(formContextToken, {
      model: props.model,
      rules: props.rules,
    });
    return () => {
      return <div class="s-form">{slots.default()}</div>;
    };
  },
});
