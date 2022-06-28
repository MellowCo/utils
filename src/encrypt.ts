/*
 * @Author: licl
 * @Date: 2022-06-28 15:33:50
 * @LastEditTime: 2022-06-28 20:05:36
 * @LastEditors: licl
 * @Description: 加密
 */
import Hex from 'crypto-js/enc-hex'
import { AES, MD5, enc, mode, pad } from 'crypto-js'

/**
 * aes加密
 * @param originalStr 原始字符串
 * @param encryptKey 加密key
 */
export function encrypt(originalStr: string, encryptKey: string) {
  const { iv, key, mode, padding } = createEncryptConfig(encryptKey)

  return AES.encrypt(originalStr, key, {
    iv,
    mode,
    padding,
  }).toString()
}

/**
 * aes加密
 * @param encryptStr 加密字符串
 * @param encryptKey 加密key
 */
export function decrypt(encryptStr: string, encryptKey: string) {
  const { iv, key, mode, padding } = createEncryptConfig(encryptKey)

  return AES.decrypt(encryptStr, key, {
    iv,
    mode,
    padding,
  }).toString(enc.Utf8)
}

const padArr = [pad.AnsiX923, pad.Iso10126, pad.Iso97971, pad.ZeroPadding, pad.NoPadding, pad.Pkcs7]
const modeArr = [mode.CBC, mode.CFB, mode.CTR, mode.CTRGladman, mode.ECB, mode.OFB]

/**
 * 生成加密配置
 * @param encryptKey 加密key
 * @returns
 */
function createEncryptConfig(encryptKey: string) {
  const md5Str = MD5(encryptKey).toString()
  const iv = Hex.parse(encryptKey)
  const md5Total = Array.from(md5Str.matchAll(/\d/g)).reduce((total, currentValue) => {
    return +currentValue[0] + total
  }, 10)

  const index = md5Total % padArr.length
  const key = MD5(`${md5Total}`)

  return {
    key, iv, mode: modeArr[index], padding: padArr[index],
  }
}
