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
 * @param text - 需要处理的字符串
 * @param repstr - 被替换的字符
 * @param newstr - 替换后的字符
 */
export function replaceAll(text: string, repstr: string, newstr: string) {
  return text.replace(new RegExp(repstr, 'gm'), newstr)
}

/**
 * @desc 去左右空格
 * @param value - 需要处理的字符串
 */
export function trim(value: string) {
  return value.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * @desc 去所有空格
 * @param value - 需要处理的字符串
 */
export function trimAll(value: string) {
  return value.replace(/\s+/g, '')
}

/**
 * 根据数字获取对应的汉字
 * @param num - 数字(0-10)
 */
export function getHanByNumber(num: number) {
  const HAN_STR = '零一二三四五六七八九十'
  return HAN_STR.charAt(num)
}

/**
 * 插入字符串
 * @param str - 原字符串
 * @param start - 插入位置
 * @param insertStr - 插入字符串
 */
export function insertStr(str: string, start: number, insertStr: string): string {
  return str.slice(0, start) + insertStr + str.slice(start)
}

