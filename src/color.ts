import { isString, randomIntegerInRange } from '.'

/**
 * 随机十六进制颜色
 * @returns #e34155
 */
export function randomHexColorCode() {
  const n = (Math.random() * 0xFFFFF * 1000000).toString(16)
  return `#${n.slice(0, 6)}`
}

/**
 * 随机 rgb 颜色
 * @param min - 最小值
 * @param max - 最大值
 * @returns
 */
export function randomRgbColor(min = 0, max = 255) {
  const r = randomIntegerInRange(min, max)
  const g = randomIntegerInRange(min, max)
  const b = randomIntegerInRange(min, max)
  return `rgb(${r},${g},${b})`
}

/**
 * rgb转hex
 * @param r - 红色
 * @param g - 绿色
 * @param b - 蓝色
 * @returns
 */
export function rgbToHex(r: string | number, g: string | number, b: string | number) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function toHex(n: string | number) {
  if (isString(n))
    n = parseInt(n, 10)
  if (isNaN(n))
    return '00'
  n = Math.max(0, Math.min(n, 255))
  return '0123456789ABCDEF'.charAt((n - n % 16) / 16)
    + '0123456789ABCDEF'.charAt(n % 16)
}

/**
 * 十六进制颜色转RGB颜色
 * @param hex 颜色值 #333 或 #333333
 */
export function hexToRGB(hex: string) {
  if (hex.length === 4) {
    const text = hex.substring(1, 4)
    hex = `#${text}${text}`
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}
