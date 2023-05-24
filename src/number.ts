import { isString } from '.'

/**
 * 转为数字
 * @param val - 值
 * @returns
 */
export function toNumber(val: any): any {
  const n = isString(val) ? Number(val) : NaN
  return isNaN(n) ? val : n
}
