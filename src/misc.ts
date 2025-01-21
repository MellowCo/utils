import type { AnyFn } from './types'
import { clone, isObject } from '.'

/**
 * 执行数组里的函数, 每个函数的返回值作为下一个函数的参数
 * @param fns - 函数数组
 * @param args - 参数
 * @example invokeArrayFns([a => a + 1, b => b + 2], 2) // 5
 */
export function invokeArrayFns<T = any, P = any>(fns: AnyFn[], args?: P): T {
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
 * @example invokeArrayAsyncFns([a => Promise.resolve(a + 1), b => Promise.resolve(b + 2)], 2) // 5
 */
export async function invokeArrayAsyncFns<T = any, P = any>(fns: AnyFn[], args?: P): Promise<T> {
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
 * @example stringHash('foo') // 193420387
 */
export function stringHash(str: string): number {
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return hash >>> 0
}

/**
 * uuid
 * @example uuid() // 3e2e2d4a-9a46-4a7f-8e71-3ca5b1c0e2e2
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
 * @example nanoid() // 3e2e2d4a-9a46-4a7f-8e71-3ca5b1c0e2e2
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
 * @example hideMobile('13800138000') // 138****8000
 */
export function hideMobile(mobile: string) {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}

/**
 * 键值对拼接成URL参数
 * @param obj - 键值对
 * @param encode - 是否编码
 * @example params2Url({ a: 1, b: 2 }) // a=1&b=2
 * @example params2Url({ a: 1, b: 2 }, true) // a%3D1%26b%3D2
 */
export function obj2Url(obj: object, encode = false) {
  const params = []
  for (const key in obj)
    params.push(`${key}=${obj[key]}`)

  const paramsStr = params.join('&')
  return encode ? encodeURIComponent(paramsStr) : paramsStr
}

/**
 * 将总秒数转换成 时:分:秒
 * @param seconds - 秒
 * @example seconds2Time(3600) // 01:00:00
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
 * @example seconds2DayTime(86400) // 01:00:00:00
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
 * @example fillZero(1) // 01
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
 * 转柯里化函数
 * @param fn - 函数
 * @example
 * const add = (a, b) => a + b
 * const curriedAdd = curry(add)
 * curriedAdd(1)(2) // 3
 * curriedAdd(1, 2) // 3
 */
export function toCurryFunc<T = any>(fn: AnyFn) {
  return function curried(this: any, ...args: T[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    else {
      return (...args2: T[]) => {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

/**
 * 防抖
 * @param fn - 函数
 * @param wait - 等待时间
 * @example debounce(() => console.log(1), 1000)()
 */
export function debounce<T = any>(fn: AnyFn, wait = 800) {
  let timer: string | number | NodeJS.Timeout | undefined

  return function (this: any, ...args: T[]) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 节流
 * @param fn - 函数
 * @param wait - 等待时间
 * @example throttle(() => console.log(1), 1000)()
 */
export function throttle<T = any>(fn: AnyFn, wait = 800) {
  let timer: string | number | NodeJS.Timeout | undefined

  return function (this: any, ...args: T[]) {
    if (timer)
      return

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = undefined
    }, wait)
  }
}

export enum OSType {
  IOS = 1,
  Android = 2,
  Other = 3,
}

/**
 * 获取操作系统类型
 * @example getOSType() // 1: IOS, 2: Android, 3: other
 */
export function getOSType() {
  const u = navigator.userAgent
  const isAndroid = u.includes('Android') || u.includes('Linux')
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isIOS)
    return OSType.IOS

  if (isAndroid)
    return OSType.Android

  return OSType.Other
}
