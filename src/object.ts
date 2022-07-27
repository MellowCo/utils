/*
 * @Author: licl
 * @Date: 2022-06-28 20:54:33
 * @LastEditTime: 2022-07-27 21:12:15
 * @LastEditors: licl
 * @Description:
 */

import { isArray } from './array'

/**
 * 深度拷贝对象
 * @param  obj - 对象
 * @returns 拷贝的对象
 */
export function clone(obj: object): object {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 清除对象中 undefined,null,[]空数组
 * @param  obj - 对象
 * @returns 清除后的对象
 */
export function clearNull(obj: any): any {
  if (typeof obj === 'object') {
    const result = clone(obj)

    for (const key in result) {
      const current = result[key]
      if ([null, ''].includes(current) || (isArray(current) && current.length === 0))
        delete result[key]
      else
        result[key] = clearNull(current)
    }
    return result
  }

  if (isArray(obj))
    return obj.map((item: any) => clearNull(item))

  return obj
}

/**
 * 是否为对象
 * @param arg - 参数
 * @returns 是否为对象
 */
export function isObject(arg: any): boolean {
  return typeof arg === 'object'
}

const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * 是否为对象的属性
 * @param val - 对象
 * @param key - 键
 */
export const hasOwn = (
  val: object,
  key: string | symbol,
): key is keyof typeof val => hasOwnProperty.call(val, key)
