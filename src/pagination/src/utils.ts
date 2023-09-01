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
    // [0,1,2,3,4] => [2,3,4]
    return totalPageArr.slice(2, totalPage);
  } else {
    // 页数较多，仅显示中间部分
    // 中位数
    const middle = Math.ceil(pagerCount / 2);
    // [0,1,2,3,4,5,6,7,8,9]
    // middle = 3
    if (pageIndex <= middle) {
      // 左边全显示
      // pageIndex 3 => [2,3,4,5,6]
      return totalPageArr.slice(2, pagerCount);
    } else if (pageIndex >= totalPage - middle + 1) {
      // 右边全显示
      // pageIndex 8 => [5,6,7,8,9]
      return totalPageArr.slice(totalPage - pagerCount + 2, totalPage);
    } else {
      // 中间显示
      // pageIndex 5 => [3,4,5,6,7]
      return totalPageArr.slice(pageIndex - middle + 2, pageIndex + middle - 1);
    }
  }
};
