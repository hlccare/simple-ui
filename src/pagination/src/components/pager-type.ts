import { ExtractPropTypes, PropType } from "vue";

export const pagerProps = {
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  pagerCount: {
    tppe: Number,
    default: 7,
  },
} as const;

export type PagerProps = ExtractPropTypes<typeof pagerProps>;
