/**
 * 执行数组里的函数
 */
export const invokeArrayFns = (fns: Function[], arg?: any) => {
  for (let i = 0; i < fns.length; i++)
    fns[i](arg)
}

/**
 * Nano version of string hash
 * @param str - 字符串
 * @returns foo => 193420387
 */
export const stringHash = (str: string): number => {
  let hash = 5381
  let i = str.length

  while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i)
  return hash >>> 0
}

/**
 * uuid
 */
export const uuid = (): string => {
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, '0'),
  ).join('')
}

/**
 * 随机十六进制颜色
 * @returns #e34155
 */
export function randomHexColorCode() {
  const n = (Math.random() * 0xFFFFF * 1000000).toString(16)
  return `#${n.slice(0, 6)}`
}
