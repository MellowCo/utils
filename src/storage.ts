/*
 * @Author: licl
 * @Date: 2022-06-28 20:09:58
 * @LastEditTime: 2022-06-28 20:25:23
 * @LastEditors: licl
 * @Description: localStorage
 */
import { decrypt, encrypt } from './encrypt'

export function setStorage(key: string, value: string | object) {
  if (typeof value === 'object')
    value = JSON.stringify(value)

  value = encrypt(value, key)
  localStorage.setItem(key, value)
}

export function getStorage(key: string) {
  const value = localStorage.getItem(key)
  if (!value)
    return null

  const decryptValue = decrypt(value, key)

  const isObject = decryptValue.startsWith('{') && decryptValue.endsWith('}')
  const isArray = decryptValue.startsWith('[') && decryptValue.endsWith(']')

  if (isArray || isObject)
    return JSON.parse(decryptValue)

  return decryptValue
}

export function deleteStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearStorage() {
  localStorage.clear()
}
