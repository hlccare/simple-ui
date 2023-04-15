import { ExtractPropTypes } from "vue";

export const virtualListProps = {
  data: {
    type: Array,
    required: true,
  },
} as const;

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>;
