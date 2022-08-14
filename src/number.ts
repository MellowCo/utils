/**
 * 转为数字
 * @param val - 值
 * @returns
 */
export const toNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

