import { isString } from './is'

/**
 * 执行数组里的函数
 */
export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++)
    fns[i](arg)
}

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

/**
 * uuid
 */
export const uuid = (): string => {
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0'),
  ).join('')
}

const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

/**
 * nanoid
 * @param alphabet - 字符串
 * @param defaultSize - 长度
 */
export const nanoid = (alphabet = urlAlphabet, defaultSize = 21) => {
  let id = ''
  // A compact alternative for `for (var i = 0; i < step; i++)`.
  let i = defaultSize
  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += alphabet[(Math.random() * 64) | 0]
  }
  return id
}

/**
 * 随机十六进制颜色
 * @returns #e34155
 */
export function randomHexColorCode() {
  const n = (Math.random() * 0xFFFFF * 1000000).toString(16)
  return `#${n.slice(0, 6)}`
}

/**
 * 手机号码中间4位隐藏星号
 * @param mobile - 手机号
 * @returns 138****8888
 */
export function hideMobile(mobile: string) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}
/**
 * rgb转hex
 * @param r - 红色
 * @param g - 绿色
 * @param b - 蓝色
 * @returns
 */
export function rgbToHex(r: string | number, g: string | number, b: string | number) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function toHex(n: string | number) {
  if (isString(n))
    n = parseInt(n, 10)
  if (isNaN(n))
    return '00'
  n = Math.max(0, Math.min(n, 255))
  return '0123456789ABCDEF'.charAt((n - n % 16) / 16)
    + '0123456789ABCDEF'.charAt(n % 16)
}

/**
 * 十六进制颜色转RGB颜色
 * @param hex 颜色值 #333 或 #333333
 */
export function hexToRGB(hex: string) {
  if (hex.length === 4) {
    const text = hex.substring(1, 4)
    hex = `#${text}${text}`
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * 随机布尔值
 * @returns true or false
 */
export function randomBoolean() {
  return Math.random() >= 0.5
}

/**
 * 键值对拼接成URL参数
 * @param obj - 键值对
 * @returns a=1&b=2
 */
export const params2Url = (obj: Object) => {
  const params = []
  for (const key in obj)
    params.push(`${key}=${obj[key]}`)

  return encodeURIComponent(params.join('&'))
}
