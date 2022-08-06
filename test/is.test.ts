/*
 * @Author: licl
 * @Date: 2022-07-31 21:17:18
 * @LastEditTime: 2022-08-06 20:17:17
 * @LastEditors: licl
 * @Description:
 */
import { describe, expect, it } from 'vitest'
import { isNull, isObject, isPlainObject } from '../src/'

describe('object', () => {
  it('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
    expect(isObject([])).toBe(true)
  })

  it('isPlainObject', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject([])).toBe(false)
  })

  it('isNull', () => {
    expect(isNull({})).toBe(false)
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(false)
  })
})
