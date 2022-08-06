/*
 * @Author: licl
 * @Date: 2022-07-31 21:17:18
 * @LastEditTime: 2022-08-06 20:31:04
 * @LastEditors: licl
 * @Description:
 */
import { describe, expect, it } from 'vitest'
import { isEmpty, isEmptyString, isNull, isObject, isPlainObject, isRegExp, isUndef, isUndefined } from '../src/'

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

  it('isUndefined', () => {
    expect(isUndefined({})).toBe(false)
    expect(isUndefined(null)).toBe(false)
    expect(isUndefined(undefined)).toBe(true)
  })

  it('isUndef', () => {
    expect(isUndef({})).toBe(false)
    expect(isUndef(null)).toBe(true)
    expect(isUndef(undefined)).toBe(true)
  })

  it('isEmptyString', () => {
    expect(isEmptyString({})).toBe(false)
    expect(isEmptyString(null)).toBe(false)
    expect(isEmptyString(undefined)).toBe(false)
    expect(isEmptyString('')).toBe(true)
    expect(isEmptyString('111')).toBe(false)
  })

  it('isEmpty', () => {
    expect(isEmpty({})).toBe(false)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('111')).toBe(false)
  })

  it('isRegExp', () => {
    expect(isRegExp({})).toBe(false)
    expect(isRegExp(null)).toBe(false)
    expect(isRegExp(undefined)).toBe(false)
    expect(isRegExp('')).toBe(false)
    expect(isRegExp('111')).toBe(false)
    expect(isRegExp(/xx/)).toBe(true)
    expect(isRegExp(new RegExp('111'))).toBe(true)
  })
})
