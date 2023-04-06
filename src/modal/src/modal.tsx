import { defineComponent, toRefs } from "vue";
import { ModalProps, modalProps } from "./modal-type";
import BaseModal from "./base-modal";
import "../style/modal.scss";
export default defineComponent({
  name: "SModal",
  props: modalProps,
  emits: ["update:modelValue"],
  setup(props: ModalProps, { slots, emit }) {
    const { modelValue, title } = toRefs(props);
    return () => (
      <BaseModal
        class="s-modal"
        modelValue={modelValue.value}
        onUpdate:modelValue={() => emit("update:modelValue")}
      >
        <div class="s-modal__container">
          {/* 标题 */}
          {slots.header ? (
            slots.header()
          ) : (
            <div class="s-modal__header">{title.value}</div>
          )}
          {/* 内容 */}
          <div class="s-modal__body">{slots.default?.()}</div>
          {/* 操作 */}
          <div class="s-modal__footer">{slots.footer?.()}</div>
        </div>
      </BaseModal>
    );
  },
});
