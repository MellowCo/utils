/* eslint-disable valid-typeof */
import { TYPE_OF } from './enum'
import { toTypeString } from './object'

export function isArray(obj: any): boolean {
  return Array.isArray(obj)
}

export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === TYPE_OF.MAP

export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === TYPE_OF.SET

export const isString = (val: unknown): val is string => typeof val === TYPE_OF.STRING

export const isDate = (val: unknown): val is Date => toTypeString(val) === TYPE_OF.DATE

export const isFunction = (val: unknown) => typeof val === TYPE_OF.FUNCTION

export const isSymbol = (val: unknown): val is symbol => typeof val === TYPE_OF.SYMBOL

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === TYPE_OF.OBJECT_STR

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isNumber = (val: any): val is number => typeof val === TYPE_OF.NUMBER

export const isNull = (val: unknown): val is null => toTypeString(val) === TYPE_OF.NULL

export const isUndefined = (val: unknown): val is undefined => toTypeString(val) === TYPE_OF.UNDEFINED

export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === TYPE_OF.REGEXP

export const isFile = (val: unknown): val is File => toTypeString(val) === TYPE_OF.FILE

/**
 * 是否为纯粹的对象
 * isObject([]) 是 true ，因为 type [] 为 'object'
 * isPlainObject([]) 则是false
 */
export const isPlainObject = (val: unknown): val is object => toTypeString(val) === TYPE_OF.OBJECT

/**
 * 是否为 null 或 underfined
 * @param v
 * @returns
 */
export function isUndef(v: unknown) {
  return isNull(v) || isUndefined(v)
}

/**
 * 是否为空字符串
 */
export function isEmptyString(v: unknown) {
  return isString(v) && v.trim().length === 0
}

/**
 * 是否为空
 * @example isEmpty(null) // true
 * @example isEmpty(undefined) // true
 * @example isEmpty('') // true
 * @example isEmpty([]) // true
 * @example isEmpty({}) // true
 * @example isEmpty(' ') // false
 * @example isEmpty(123) // true
 */
export function isEmpty(val: any) {
  return val == null || !(Object.keys(val) || val).length
}
