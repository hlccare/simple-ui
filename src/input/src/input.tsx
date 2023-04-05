import { defineComponent } from "vue";
import { InputProps, inputProps } from "./input-type";
export default defineComponent({
  name: "SInput",
  props: inputProps,
  emits: ["update:modelValue"],
  setup(props: InputProps, { emit }) {
    const onInput = (e: Event) => {
      emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    return () => (
      <div class="s-input__wrapper">
        <input
          class="s-input__input"
          value={props.modelValue}
          onInput={onInput}
          type={props.type}
        ></input>
      </div>
    );
  },
});
