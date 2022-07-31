/*
 * @Author: licl
 * @Date: 2022-07-31 21:17:18
 * @LastEditTime: 2022-07-31 21:25:54
 * @LastEditors: licl
 * @Description:
 */
import { describe, expect, it } from 'vitest'
import { isObject, isPlainObject } from '../src/'

describe('object', () => {
  it('isObject', () => {
    expect(isObject({})).toMatchInlineSnapshot('true')
    expect(isObject(null)).toMatchInlineSnapshot('false')
    expect(isObject(undefined)).toMatchInlineSnapshot('false')
    expect(isObject([])).toMatchInlineSnapshot('true')
  })

  it('isPlainObject', () => {
    expect(isPlainObject({})).toMatchInlineSnapshot('true')
    expect(isPlainObject(null)).toMatchInlineSnapshot('false')
    expect(isPlainObject(undefined)).toMatchInlineSnapshot('false')
    expect(isPlainObject([])).toMatchInlineSnapshot('false')
  })
})
