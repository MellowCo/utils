/*
 * @Author: licl
 * @Date: 2022-07-27 21:21:50
 * @LastEditTime: 2022-07-28 14:30:39
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { camelize, capitalize, hyphenate } from '../src'

describe('string', () => {
  it('camelize', () => {
    expect(camelize('user-info')).toBe('userInfo')
  })

  it('capitalize', () => {
    expect(capitalize('userInfo')).toBe('UserInfo')
  })

  it('hyphenate', () => {
    expect(hyphenate('UserInfo')).toBe('user-info')
    expect(hyphenate('UsErInfo')).toBe('us-er-info')
  })
})
