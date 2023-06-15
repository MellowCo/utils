import { clone, isObject } from '.'

/**
 * 执行数组里的函数, 每个函数的返回值作为下一个函数的参数
 * @param fns - 函数数组
 * @param args - 参数
 */
export function invokeArrayFns<T = any, P = any>(fns: Function[], args?: P): T {
  let _args = args

  // 如果参数是对象, 则深拷贝一份, 防止修改原对象
  if (isObject(_args))
    _args = clone(args)

  for (const fn of fns) {
    const data = fn(_args)
    _args = data
  }

  return _args as T
}

/**
 * 执行数组里的异步函数, 每个函数的返回值作为下一个函数的参数
 * @param fns - 函数数组
 * @param args - 参数
 */
export async function invokeArrayAsyncFns<T = any, P = any>(fns: Function[], args?: P): Promise<T> {
  let _args = clone(args)

  for (const fn of fns) {
    const data = await fn(_args)
    _args = data
  }

  return _args as Promise<T>
}

/**
 * 字符串哈希
 * @param str - 字符串
 * @returns foo => 193420387
 */
export function stringHash(str: string): number {
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return hash >>> 0
}

/**
 * uuid
 */
export function uuid(): string {
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
export function nanoid(defaultSize = 21, alphabet = urlAlphabet) {
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
 * 键值对拼接成URL参数
 * @param obj - 键值对
 * @param encode - 是否编码
 * @returns a=1&b=2 或者 a%3D1%26b%3D2
 */
export function params2Url(obj: Object, encode = false) {
  const params = []
  for (const key in obj)
    params.push(`${key}=${obj[key]}`)

  const paramsStr = params.join('&')
  return encode ? encodeURIComponent(paramsStr) : paramsStr
}

/**
 * 将总秒数转换成 时:分:秒
 * @param seconds - 秒
 */
export function seconds2Time(seconds: number) {
  const hour = Math.floor(seconds / 3600)
  const minute = Math.floor((seconds - hour * 3600) / 60)
  const second = seconds - hour * 3600 - minute * 60
  return `${fillZero(hour)}:${fillZero(minute)}:${fillZero(second)}`
}

/**
 * 将总秒数转换成 日:时:分:秒
 * @param seconds - 秒
 */
export function seconds2DayTime(seconds: number) {
  const day = Math.floor(seconds / 86400)
  const hour = Math.floor((seconds - day * 86400) / 3600)
  const minute = Math.floor((seconds - day * 86400 - hour * 3600) / 60)
  const second = seconds - day * 86400 - hour * 3600 - minute * 60
  return `${fillZero(day)}:${fillZero(hour)}:${fillZero(minute)}:${fillZero(second)}`
}

/**
 * 填充0
 * @param num - 数字
 */
function fillZero(num: number) {
  /**
   * ES6 字符串补全
   * padStart：返回新的字符串，表示用参数字符串从头部（左侧）补全原字符串。
   * padEnd：返回新的字符串，表示用参数字符串从尾部（右侧）补全原字符串。
   * 以上两个方法接受两个参数，
   * 第一个参数是指定生成的字符串的最小长度，
   * 第二个参数是用来补全的字符串。如果没有指定第二个参数，默认用空格填充。
   * @link https://www.runoob.com/w3cnote/es6-string.html
   */
  return num.toString().padStart(2, '0')
}

/**
 * 下载文件
 * @param link - 文件链接
 * @param name - 文件名
 * @example downloadFile('http://www.baidu.com/img/bd_logo1.png', 'logo.png')
 */
export function download(link: string, name?: string) {
  if (!name)
    name = link.slice(link.lastIndexOf('/') + 1)

  const eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.style.display = 'none'
  eleLink.href = link
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

/**
 * 浏览器下载静态文件
 * @param name - 文件名
 * @param content - 文件内容 非Blob类型会自动转换
 * @example downloadFile('1.json','xxxxxxxxxxxx'))
 * @example downloadFile('1.json',new Blob([ data ]))
 */
export function downloadFile(name: string, content: any) {
  if (typeof name == 'undefined')
    throw new Error('The first parameter name is a must')

  if (typeof content == 'undefined')
    throw new Error('The second parameter content is a must')

  if (!(content instanceof Blob))
    content = new Blob([content])

  const link = URL.createObjectURL(content)
  download(link, name)
}

/**
 * 判断是否是移动端agent字符
 * @param agent - agent string
 * @returns true or false
 */
export function isMobileAgent(agent: string) {
  return /Android|webOS|iPhone|iPod|BlackBerry|Mobile/i.test(agent)
}

/**
 * 判断是否是移动端
 * @returns
 */
export function isMobile() {
  return isMobileAgent(navigator.userAgent)
}

/**
 * 将数组按照 key 分组
 * @param arr 数组
 * @param key arr对象的key
 * @example
 * const arr = [
 *    { classId: '1', name: '张三', age: 16 },
 *    { classId: '1', name: '李四', age: 15 },
 *    { classId: '2', name: '王五', age: 16 },
 * ]
 * groupArrayByKey(arr, 'classId')
 *
 * // 结果
 * {
 *   1: [
 *       { classId: '1', name: '张三', age: 16 },
 *       { classId: '1', name: '李四', age: 15 }
 *   ],
 *  2: [
 *     { classId: '2', name: '王五', age: 16 }
 *  ]
 * }
 */
export function groupArrayByKey<T = any>(arr: T[] = [], key: keyof T) {
  return arr.reduce((t, v) => (!t[v[key]] && ((t[v[key]] = []), t[v[key]].push(v), t)), {} as any)
}
