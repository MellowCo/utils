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

// https://github.com/ai/nanoid/blob/main/non-secure/index.js
const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

/**
 * nanoid
 * @param alphabet - 字符串
 * @param defaultSize - 长度
 */
export const nanoid = (defaultSize = 21, alphabet = urlAlphabet) => {
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
 * 手机号码中间4位隐藏星号
 * @param mobile - 手机号
 * @returns 138****8888
 */
export function hideMobile(mobile: string) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
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
