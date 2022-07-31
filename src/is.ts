import { toTypeString } from './object'

export function isArray(obj: any): boolean {
  return Array.isArray(obj)
}

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 是否为纯粹的对象
 * isObject([]) 是 true ，因为 type [] 为 'object'
 * isPlainObject([]) 则是false
 */
export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

export function isUndef(v: unknown) {
  return v === undefined || v === null
}
