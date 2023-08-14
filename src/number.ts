import { isString } from '.'

/**
 * 转为数字
 * @param val - 值
 * @returns
 */
export function toNumber(val: any): any {
  const n = isString(val) ? Number(val) : Number.NaN
  return Number.isNaN(n) ? val : n
}
