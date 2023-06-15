import { isArray, isUndefined } from '.'

/**
 * JSON深度拷贝对象
 * @param  obj - 对象
 * @returns 拷贝的对象
 */
export function clone<T = any>(obj: T): T {
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
 * 是否为对象的属性
 * @param val - 对象
 * @param key - 键
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(val: object,
  key: string | symbol): key is keyof typeof val {
  return hasOwnProperty.call(val, key)
}

export const objectToString = Object.prototype.toString
/**
 * 对象类型
 * @param value - 对象
 */
export function toTypeString(value: unknown): string {
  return objectToString.call(value)
}

/**
 * 比较一个值是否改变
 * @param value - 对象
 * @param oldValue - 对象
 *
 */
export function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(value, oldValue)
}

/**
 * 获取对象的属性值
 * @param obj - 对象
 * @param path - 属性路径
 * @param defaultValue - 属性路径不存在，返回默认值
 * @example
 * const obj = { a: { b: { c: 1 } } }
 * getByPath(obj, 'a.b.c') // 1
 * getByPath(obj, 'a.b.d') // 'no value'
 * getByPath(obj, 'a.b.d', 2) // 2
 */
export function getByPath(obj: any, path: string, defaultValue: any = 'no value'): any {
  const parts = path.split('.')
  const key = parts.shift()

  if (!isUndefined(key) && !isUndefined(obj[key])) {
    return parts.length > 0
      ? getByPath(obj[key], parts.join('.'), defaultValue)
      : obj[key]
  }

  // 如果没有找到key返回 defaultValue
  return defaultValue
}
