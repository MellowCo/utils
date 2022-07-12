import { decrypt, encrypt } from './encrypt'

/**
 * 设置localStorage
 * @param key - 存储的键
 * @param value - 未加密的值
 * @param needEncrypt - 是否需要加密
 */
export function setStorage(key: string, value: string | object, needEncrypt = true): void {
  if (typeof value === 'object')
    value = JSON.stringify(value)

  if (needEncrypt)
    value = encrypt(`${value}`, key)
  localStorage.setItem(key, value)
}

/**
 * 获取localStorage
 * @param key - 存储的键
 * @param needEncrypt - 是否需要加密
 * @returns {string | null} - 获取的值
 */
export function getStorage(key: string, needEncrypt = true): string | null {
  let value = localStorage.getItem(key)
  if (!value)
    return null

  if (needEncrypt)
    value = decrypt(value, key)

  const isObject = value.startsWith('{') && value.endsWith('}')
  const isArray = value.startsWith('[') && value.endsWith(']')

  if (isArray || isObject)
    return JSON.parse(value)

  return value
}

/**
 * 删除localStorage
 * @param key - 存储的键
 */
export function removeStorage(key: string): void {
  localStorage.removeItem(key)
}

/**
 * 清空localStorage
 */
export function clearStorage() {
  localStorage.clear()
}
