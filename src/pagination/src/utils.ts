// 获取中间显示页面数组
export const getCenterPage = (
  totalPage: number,
  pageIndex: number,
  pagerCount: number
) => {
  // 长度为totalPage的数组，下标从0开始
  const totalPageArr = Array.from(Array(totalPage).keys());

  if (totalPage <= pagerCount) {
    // 页数小于pager数，全部显示
    return totalPageArr.slice(2, totalPage);
  } else {
    // 中位数
    const middle = Math.ceil(pagerCount / 2);
    if (pageIndex <= middle) {
      // 左边全显示
      return totalPageArr.slice(2, pagerCount);
    } else if (pageIndex >= totalPage - middle + 1) {
      // 右边全显示
      return totalPageArr.slice(totalPage - pagerCount + 2, totalPage);
    } else {
      // 中间显示
      return totalPageArr.slice(pageIndex - middle + 2, pageIndex + middle - 1);
    }
  }
};
