import { AES, MD5, enc, mode, pad } from 'crypto-js'

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
  }).toString(enc.Utf8)
}

/**
 * 生成加密配置
 * @param encryptKey 加密key
 * @returns {{iv,key,mode,padding}} - 加密配置
 */
function createEncryptConfig(encryptKey: string): { key: any; iv: any; mode: any; padding: any } {
  const padArr = [pad.AnsiX923, pad.Iso10126, pad.Iso97971, pad.ZeroPadding, pad.NoPadding, pad.Pkcs7]
  const modeArr = [mode.CBC, mode.CFB, mode.CTR, mode.CTRGladman, mode.CFB, mode.OFB]

  const md5Str = MD5(encryptKey).toString()
  const iv = enc.Hex.parse(encryptKey)
  const md5Total = Array.from(md5Str.matchAll(/\d/g)).reduce((total, currentValue) => {
    return +currentValue[0] + total
  }, 10)

  const index = md5Total % padArr.length
  const key = MD5(`${md5Total}`)

  return {
    key, iv, mode: modeArr[index], padding: padArr[index],
  }
}
