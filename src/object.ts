/*
 * @Author: licl
 * @Date: 2022-06-28 20:54:33
 * @LastEditTime: 2022-07-12 08:44:36
 * @LastEditors: licl
 * @Description:
 */

import { isArray } from './array'

/**
 * 深度拷贝对象
 * @param {object} obj - 对象
 * @returns {object} - 拷贝的对象
 */
export function clone(obj: object): object {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 清除对象中 undefined,null,[]空数组
 * @param {any} obj - 对象
 * @returns {any} - 清除后的对象
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
 * @param {any} arg - 参数
 * @returns {boolean} - 是否为对象
 */
export function isObject(arg: any): boolean {
  return typeof arg === 'object'
}
