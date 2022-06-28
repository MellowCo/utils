/*
 * @Author: licl
 * @Date: 2022-06-28 20:51:40
 * @LastEditTime: 2022-06-28 20:51:42
 * @LastEditors: licl
 * @Description: promise
 */

import type { Fn } from './types'

export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
