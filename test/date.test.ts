/*
 * @Author: licl
 * @Date: 2022-07-20 11:39:40
 * @LastEditTime: 2022-07-27 21:24:54
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { dateFormatTag, formatDate, getDaysOfLastMonth, getDaysOfMonth, getDaysOfWeek, getDaysToNowOfMonth, getFirstDayOfMonth, getFirstDayOfYear } from '../src'

describe('date', () => {
  it('formatDate', () => {
    const now = new Date()

    expect(formatDate()).toMatchInlineSnapshot('"2022-07-27 21:41:37"')
    expect(formatDate({ date: now })).toMatchInlineSnapshot('"2022-07-27 21:41:37"')
    // expect(formatDate({ date: now, toDate: true })).toMatchInlineSnapshot('2022-07-27T13:24:44.155Z')
    expect(formatDate({ date: '2022-07-20 13:42:20', format: dateFormatTag.toDay })).toMatchInlineSnapshot('"2022-07-20"')
  })

  it('getFirstDayOfMonth', () => {
    expect(getFirstDayOfMonth()).toMatchInlineSnapshot('"2022-07-01"')
    expect(getFirstDayOfMonth({ format: dateFormatTag.toSecond })).toMatchInlineSnapshot('"2022-07-01 00:00:00"')
    expect(getFirstDayOfMonth({ date: new Date() })).toMatchInlineSnapshot('"2022-07-01"')
    expect(getFirstDayOfMonth({ date: '2020/03/23' })).toBe('2020-03-01')
    expect(getFirstDayOfMonth({ year: 2021 })).toMatchInlineSnapshot('"2021-07-01"')
    expect(getFirstDayOfMonth({ month: 4 })).toMatchInlineSnapshot('"2022-04-01"')
    expect(getFirstDayOfMonth({ month: 4, year: 2021 })).toBe('2021-04-01')
  })

  it('getDaysOfMonth', () => {
    expect(getDaysOfMonth()).toMatchInlineSnapshot(`
      [
        "2022-07-01",
        "2022-07-31",
      ]
    `)
    expect(getDaysOfMonth({ format: dateFormatTag.toSecond })).toMatchInlineSnapshot(`
      [
        "2022-07-01 00:00:00",
        "2022-07-31 23:59:59",
      ]
    `)
    expect(getDaysOfMonth({ date: new Date() })).toMatchInlineSnapshot(`
      [
        "2022-07-01",
        "2022-07-31",
      ]
    `)
    expect(getDaysOfMonth({ date: '2020/03/23' })).toMatchInlineSnapshot(`
      [
        "2020-03-01",
        "2020-03-31",
      ]
    `)
    expect(getDaysOfMonth({ year: 2021 })).toMatchInlineSnapshot(`
      [
        "2021-07-01",
        "2021-07-31",
      ]
    `)
    expect(getDaysOfMonth({ month: 4 })).toMatchInlineSnapshot(`
      [
        "2022-04-01",
        "2022-04-30",
      ]
    `)
    expect(getDaysOfMonth({ month: 4, year: 2021 })).toMatchInlineSnapshot(`
      [
        "2021-04-01",
        "2021-04-30",
      ]
    `)
  })

  it('getFirstDayOfYear', () => {
    expect(getFirstDayOfYear()).toMatchInlineSnapshot('"2022-01-01"')
    expect(getFirstDayOfYear({ tag: dateFormatTag.toSecond })).toMatchInlineSnapshot('"2022-01-01"')
    expect(getFirstDayOfYear({ year: 2014 })).toMatchInlineSnapshot('"2014-01-01"')
  })

  it('getDaysOfLastMonth', () => {
    expect(getDaysOfLastMonth()).toMatchInlineSnapshot(`
      [
        "2022-06-01",
        "2022-06-30",
      ]
    `)
  })

  it('getDaysOfWeek', () => {
    expect(getDaysOfWeek()).toMatchInlineSnapshot(`
      [
        "2022-07-24",
        "2022-07-30",
      ]
    `)
  })

  it('getDaysToNowOfMonth', () => {
    expect(getDaysToNowOfMonth()).toMatchInlineSnapshot(`
      [
        "2022-07-01",
        "2022-07-27",
      ]
    `)
    expect(getDaysToNowOfMonth({ format: dateFormatTag.toSecond })).toMatchInlineSnapshot(`
      [
        "2022-07-01 00:00:00",
        "2022-07-27 21:41:37",
      ]
    `)
    expect(getDaysToNowOfMonth({ year: 2014 })).toMatchInlineSnapshot(`
      [
        "2014-07-01",
        "2022-07-27",
      ]
    `)
  })
})
