/**
 * 转为数字
 * @param val - 值
 * @returns
 */
export const toNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}
/**
 * 生成指定范围的随机整数
 * @param min - 最小值
 * @param max - 最大值
 * @returns (0,5) => 3
 */
export function randomIntegerInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成指定范围的随机小数
 * @param min - 最小值
 * @param max - 最大值
 * @returns (0,5) => 3.0211363285087005
 */
export function randomNumberInRange(min: number, max: number) {
  return Math.random() * (max - min) + min
}
