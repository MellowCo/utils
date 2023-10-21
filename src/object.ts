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
export function normalize(obj: any): any {
  if (typeof obj === 'object') {
    const result = clone(obj)

    for (const key in result) {
      const current = result[key]
      if ([null, ''].includes(current) || (isArray(current) && current.length === 0))
        delete result[key]
      else
        result[key] = normalize(current)
    }
    return result
  }

  if (isArray(obj))
    return obj.map((item: any) => normalize(item))

  return obj
}

/**
 * 是否为对象的属性
 * @param val - 对象
 * @param key - 键
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(val: object,
  key: string | number | symbol) {
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

/**
 * 忽略对象选中的属性
 * @param obj 来源对象
 * @param paths 要被忽略的属性数组
 * @example omit({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { c: 3 }
 */
export function omit<T extends object, K extends keyof T>(obj: T, paths: K[]) {
  /** 获取对象的属性数组，然后筛出给定的key */
  return (Object.keys(obj) as K[]).reduce((acc, key) => {
    if (!paths.includes(key))
      hasOwn(obj, key) && (acc[key] = obj[key])

    return acc
  }, {} as Pick<T, K>)
}

/**
 * 生成经 predicate 判断为假值的属性的对象
 * @param obj 来源对象
 * @param predicate 调用每一个属性的函数
 * @example const obj = { a: 1, b: 2, c: 3 }
 * omitBy(obj, value => value > 1) // { a: 1 }
 */
export function omitBy<T>(
  obj: T,
  predicate: (item: T[Extract<keyof T, string>], key: keyof T) => boolean,
) {
  const result = {} as { [K in keyof T]: T[K] }
  for (const key in obj) {
    const curProperty = obj[key]

    if (!predicate(curProperty, key))
      result[key] = curProperty
  }

  return result
}

/**
 * 生成选中属性的对象
 * @param  obj 来源对象
 * @param  paths 要被选中的属性数组
 * @example const obj = { a: 1, b: 2, c: 3 }
 * pick(obj, ['a', 'b']) // { a: 1, b: 2 }
 */
export function pick<T extends object, K extends keyof T>(obj: T, paths: K[] = []) {
  /** 筛出给定的key */
  return paths.reduce((acc, key) => {
    hasOwn(obj, key) && (acc[key] = obj[key])
    return acc
  }, {} as Pick<T, K>)
}

/**
 *  生成经 predicate 判断为真值的属性的对象
 * @param object 来源对象
 * @param predicate 调用每一个属性的函数
 * @example const obj = { a: 1, b: 2, c: 3 }
 * pickBy(obj, (value, key) => value > 1) // { b: 2, c: 3 }
 */
export function pickBy<T>(
  obj: T,
  predicate: (item: T[Extract<keyof T, string>], key: keyof T) => boolean,
) {
  const result = {} as { [K in keyof T]: T[K] }

  for (const key in obj) {
    const curProperty = obj[key]

    if (predicate(curProperty, key))
      result[key] = curProperty
  }

  return result
}
