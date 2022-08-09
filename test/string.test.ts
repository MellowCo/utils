/*
 * @Author: licl
 * @Date: 2022-07-27 21:21:50
 * @LastEditTime: 2022-08-09 08:36:47
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { camelize, capitalize, hyphenate, insertStr } from '../src'

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

  it('insertStr', () => {
    expect(insertStr('UserInfo', -2, '-insert-')).toMatchInlineSnapshot('"UserIn-insert-fo"')
  })
})
