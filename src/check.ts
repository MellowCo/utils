/**
 * function 参数校验
 * @example
 * function double(value = required()) {
 *  return value * 2
 * }
 *
 * double(3) // 6
 * double() // throw Error
 */
export function required() {
  throw new Error('方法缺少必要参数')
}
