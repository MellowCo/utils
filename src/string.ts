const camelizeRE = /-(\w)/g
/**
 * 驼峰化
 * @param str - 字符串
 * @returns user-info => userInfo
 */
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * 首字母大写
 * @param str - 字符串
 * @returns userInfo => UserInfo
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

/**
 * Nano version of string hash
 * @param str - 字符串
 * @returns foo => 193420387
 */
export const stringHash = (str: string): number => {
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return hash >>> 0
}
