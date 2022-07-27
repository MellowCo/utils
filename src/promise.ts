/*
 * @Author: licl
 * @Date: 2022-06-28 20:51:40
 * @LastEditTime: 2022-07-27 20:58:06
 * @LastEditors: licl
 * @Description: promise
 */

import type { Fn } from './types'

/**
 * 睡眠
 * @param ms - 毫秒数
 * @param callback - 回调函数
 */
export function sleep(ms: number, callback?: Fn<any>): Promise<void> {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      callback && await callback()
      resolve()
    }, ms),
  )
}
