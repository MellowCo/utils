/**
 * 移除数组中的某个元素
 * @param arr - 数组
 * @param el - 元素
 */
export function removeAt<T>(arr: T[], el: T) {
  const i = arr.indexOf(el)
  if (i > -1)
    arr.splice(i, 1)
}

/**
 * 将值插入到指定索引之后
 * @param arr - 数组
 * @param index - 索引
 * @param v - 值
 * @example
 * let otherArray = [2, 10];
 * insertAt(otherArray, 0, 4, 6, 8); // otherArray = [2, 4, 6, 8, 10]
 */
export function insertAt<T>(arr: T[], index: number, ...v: T[]) {
  arr.splice(index + 1, 0, ...v)
  return arr
}

/**
 * 返回数组中的最后一个元素
 * @param arr - 数组
 * @example
 * last([1, 2, 3]); // 3
 * last([]); // undefined
 * last(null); // undefined
 * last(undefined); // undefined
 */
export function last<T>(arr: T[]) {
  return arr && (arr.length ? arr[arr.length - 1] : undefined)
}

/**
 * 返回数组中的最后 n 个元素
 * @param arr - 数组
 * @param n - 索引
 * @example lastN(['a', 'b', 'c', 'd'], 2); // ['c', 'd']
 */
export const lastN = <T>(arr: T[], n: number) => arr.slice(-n)

/**
 * 布尔全等判断
 * @param arr - 数组
 * @param fn - 判断函数
 * @example all([4, 2, 3], x => x > 1) => true
 */
export function all(arr: unknown[], fn = Boolean) {
  return arr.every(fn)
}

/**
 * 检查数组各项相等
 * @param arr - 数组
 * @example allEqual([4, 2, 3]) => false
 * @example allEqual([4, 4, 4]) => true
 */
export function allEqual(arr: unknown[]) {
  return arr.every(val => val === arr[0])
}

/**
 * 生成一个指定长度的数组
 * @param length - 数组长度
 * @param value - 数组元素
 * @example createArray(3, 'x'); // ['x', 'x', 'x']
 */
export function createArray<T>(length: number, value: T) {
  return Array.from({ length }).fill(value)
}

/**
 * 打乱数组
 * @param arr - 数组
 * @example shuffleArray([1, 2, 3]); // [2, 3, 1]
 */
export function shuffleArray<T>(arr: T[]) {
  return arr.sort(() => Math.random() - 0.5)
}

/**
 * 移除数组中的重复元素 (基础数据类型)
 * @param arr - 数组
 * @example removeDuplicates([1, 2, 3, 4, 2, 3]); // [1, 2, 3, 4]
 */
export function removeDuplicates<T>(arr: T[]) {
  return [...new Set(arr)]
}

/**
 * 根据条件移除数组中的元素 (对象)
 * @param arr - 数组
 * @param prop - 属性
 * @example removeBy([{ id: 1 }, { id: 2 }, { id: 2 }], 'id') => [{ id: 1 }, { id: 2 }]
 */
export function duplicateBy<T>(arr: T[], prop: keyof T) {
  return [
    ...arr.reduce((prev, cur) => prev.set(cur[prop], cur), new Map()).values(),
  ]
}

/**
 * 多数组取交集
 * @param arr
 * @example intersection([1, 2, 3], [4, 3, 2], [2, 3, 4]); // [2, 3]
 */
export function intersection<T>(...arr: T[][]) {
  return [...new Set(arr[0])].filter(v => arr.every(b => b.includes(v)))
}

/**
 * 查找最大值索引
 * @param arr - 数组
 * @example indexOfMax([20, 10, 5, 30]); // 3
 */
export function indexOfMax(arr: number[]) {
  return arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0)
}

/**
 * 查找最小值索引
 * @param arr - 数组
 * @example indexOfMin([20, 10, 5, 30]); // 2
 */
export function indexOfMin(arr: number[]) {
  return arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
}

/**
 * 最接近的数值
 * @param arr - 数组
 * @param n - 数值
 * @example closest([1, 2, 3, 4], 5); // 4
 */
export function closest(arr: number[], n: number) {
  return arr.reduce((prev, curr) => (Math.abs(curr - n) < Math.abs(prev - n) ? curr : prev))
}

/**
 * 矩阵交换行和列
 * @param matrix - 矩阵
 * @example transpose([[1, 2, 3], [4, 5, 6]]); // [[1, 4], [2, 5], [3, 6]]
 */
export function transpose<T>(matrix: T[][]) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]))
}
