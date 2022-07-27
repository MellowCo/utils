/**
 * 是否为string
 * @param arg - 参数
 * @returns 是否为string
 */
export function isString(arg: any): boolean {
  return typeof arg === 'string'
}

const camelizeRE = /-(\w)/g
/**
 * 驼峰化
 * @param str - 字符串
 * @returns 驼峰化后的字符串 user-info => userInfo
 */
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * 首字母大写
 * @param str - 字符串
 * @returns 首字母大写后的字符串 userInfo => UserInfo
 */
export const capitalize
  = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const hyphenateRE = /\B([A-Z])/g
/**
 * 大写字母 转为 小写-连接
 * @param str - 字符串
 * @returns UserInfo => user-info
 */
export const hyphenate = (str: string) =>
  str.replace(hyphenateRE, '-$1').toLowerCase()

