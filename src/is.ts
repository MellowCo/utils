import { toTypeString } from './object'

export function isArray(obj: any): boolean {
  return Array.isArray(obj)
}

export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> =>
  toTypeString(val) === '[object Set]'

export function isString(arg: any): boolean {
  return typeof arg === 'string'
}
