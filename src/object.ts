/*
 * @Author: licl
 * @Date: 2022-06-28 20:54:33
 * @LastEditTime: 2022-06-29 21:09:39
 * @LastEditors: licl
 * @Description:
 */

import { isArray } from './array'

export function clone(obj: object) {
  return JSON.parse(JSON.stringify(obj))
}

export function clearUndefined(obj: any) {
  if (typeof obj === 'object') {
    const result = clone(obj)

    for (const key in result) {
      const current = result[key]
      if ([null, ''].includes(current) || (isArray(current) && current.length === 0))
        delete result[key]
      else
        result[key] = clearUndefined(current)
    }
    return result
  }

  if (isArray(obj))
    return obj.map((item: any) => clearUndefined(item))

  return obj
}

export function isObject(arg: any) {
  return typeof arg === 'object'
}
