/**
 * 移除数组中的某个元素
 * @param arr - 数组
 * @param el - 元素
 */
export const remove = <T>(arr: T[], el: T) => {
  const i = arr.indexOf(el)
  if (i > -1)
    arr.splice(i, 1)
}

/**
 * 布尔全等判断
 * @param arr - 数组
 * @param fn - 判断函数
 * @returns all([4, 2, 3], x => x > 1) => true
 */
export function all(arr: unknown[], fn = Boolean) {
  return arr.every(fn)
}
