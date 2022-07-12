/*
 * @Author: licl
 * @Date: 2022-07-12 08:54:17
 * @LastEditTime: 2022-07-12 09:06:39
 * @LastEditors: licl
 * @Description:
 */
import { describe, expect, it } from 'vitest'
import { compareVersion } from '../src/version'

describe('version', () => {
  it('compareVersion', () => {
    expect(compareVersion('1.1.1', '2.1.1')).toBe(-1)
    expect(compareVersion('1.1.1', '1.1.1')).toBe(0)
    expect(compareVersion('1.10.1', '1.9.1')).toBe(1)
    expect(compareVersion('1.9.1.1', '1.9.1')).toBe(1)
    expect(compareVersion('1.9.1.1', '1.10.1')).toBe(-1)
  })
})
