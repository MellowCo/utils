/**
 * 是否为数组
 * @param obj  - 对象
 * @returns 是否为数组
 */
export function isArray(obj: any): boolean {
  return Array.isArray(obj)
}

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
