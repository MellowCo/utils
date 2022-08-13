import AES from 'crypto-js/aes'
import MD5 from 'crypto-js/md5'
import encUtf8 from 'crypto-js/enc-utf8'
import encHex from 'crypto-js/enc-hex'

import CFB from 'crypto-js/mode-cfb'
import CTR from 'crypto-js/mode-ctr'
import CTRGladman from 'crypto-js/mode-ctr-gladman'
import OFB from 'crypto-js/mode-ofb'

import AnsiX923 from 'crypto-js/pad-ansix923'
import Iso10126 from 'crypto-js/pad-iso10126'
import Iso97971 from 'crypto-js/pad-iso97971'
import ZeroPadding from 'crypto-js/pad-zeropadding'
import NoPadding from 'crypto-js/pad-nopadding'
import Pkcs7 from 'crypto-js/pad-pkcs7'

/**
 * aes加密
 * @param {string} originalStr - 原始字符串
 * @param {string} encryptKey - 加密key
 * @returns {string} - 加密后的字符串
 */
export function encrypt(originalStr: string, encryptKey: string): string {
  const { iv, key, mode, padding } = createEncryptConfig(encryptKey)

  return AES.encrypt(originalStr, key, {
    iv,
    mode,
    padding,
  }).toString()
}

/**
 * aes解密
 * @param encryptStr 加密字符串
 * @param encryptKey 加密key
 * @returns {string} - 解密后的字符串
 */
export function decrypt(encryptStr: string, encryptKey: string): string {
  const { iv, key, mode, padding } = createEncryptConfig(encryptKey)

  return AES.decrypt(encryptStr, key, {
    iv,
    mode,
    padding,
  }).toString(encUtf8)
}

/**
 * 生成加密配置
 * @param encryptKey 加密key
 * @returns {{iv,key,mode,padding}} - 加密配置
 */
function createEncryptConfig(encryptKey: string): { key: any; iv: any; mode: any; padding: any } {
  const padArr = [AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding, Pkcs7]
  const modeArr = [CTRGladman, CFB, CTR, CTRGladman, CFB, OFB]

  const md5Str = MD5(encryptKey).toString()
  const iv = encHex.parse(encryptKey)
  const md5Total = Array.from(md5Str.matchAll(/\d/g)).reduce((total, currentValue) => {
    return +currentValue[0] + total
  }, 10)

  const index = md5Total % padArr.length
  const key = MD5(`${md5Total}`)

  return {
    key, iv, mode: modeArr[index], padding: padArr[index],
  }
}
