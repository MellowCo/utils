/*
 * @Author: licl
 * @Date: 2022-06-28 20:51:40
 * @LastEditTime: 2022-06-29 15:08:48
 * @LastEditors: licl
 * @Description: promise
 */

import type { Fn } from './types'

export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      callback && await callback()
      resolve()
    }, ms),
  )
}
