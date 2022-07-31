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
 * 替换所有相同字符串
 * @param  text - 需要处理的字符串
 * @param  repstr - 被替换的字符
 * @param  newstr - 替换后的字符
 */
export function replaceAll(text: string, repstr: string, newstr: string) {
  return text.replace(new RegExp(repstr, 'gm'), newstr)
}
