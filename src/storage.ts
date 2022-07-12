/*
 * @Author: licl
 * @Date: 2022-06-28 20:09:58
 * @LastEditTime: 2022-07-12 08:32:32
 * @LastEditors: licl
 * @Description: localStorage
 */
import { decrypt, encrypt } from './encrypt'

export function setStorage(key: string, value: string | object, needEncrypt = true) {
  if (typeof value === 'object')
    value = JSON.stringify(value)

  if (needEncrypt)
    value = encrypt(`${value}`, key)
  localStorage.setItem(key, value)
}

export function getStorage(key: string, needEncrypt = true) {
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

export function removeStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearStorage() {
  localStorage.clear()
}
