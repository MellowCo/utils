/*
 * @Author: licl
 * @Date: 2022-07-20 11:39:40
 * @LastEditTime: 2022-08-09 08:38:05
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { FormatType, addDays, formatDate, getDaysOfLastMonth, getDaysOfMonth, getDaysOfWeek, getDaysToNowOfMonth, getFirstDayOfMonth, getFirstDayOfYear, isAfter, isBefore, isBetween, subDays } from '../src'

describe('date', () => {
  it('formatDate', () => {
    const now = new Date()

    expect(formatDate('2022')).toMatchInlineSnapshot('"2022-01-01 00:00:00"')
    expect(formatDate('2022-03')).toMatchInlineSnapshot('"2022-03-01 00:00:00"')
    expect(formatDate('', FormatType.toDay)).toMatchInlineSnapshot('"2022-08-15"')
    expect(formatDate(now, FormatType.toDay)).toMatchInlineSnapshot('"2022-08-15"')
  })

  it('getFirstDayOfMonth', () => {
    expect(getFirstDayOfMonth()).toMatchInlineSnapshot('"2022-08-01"')
    expect(getFirstDayOfMonth('', FormatType.toSecond)).toMatchInlineSnapshot('"2022-08-01 00:00:00"')
    expect(getFirstDayOfMonth('2020/03/23')).toBe('2020-03-01')
    expect(getFirstDayOfMonth('2021')).toMatchInlineSnapshot('"2021-01-01"')
    expect(getFirstDayOfMonth('202207')).toMatchInlineSnapshot('"2022-07-01"')
  })

  it('getDaysOfMonth', () => {
    expect(getDaysOfMonth()).toMatchInlineSnapshot(`
      [
        "2022-08-01",
        "2022-08-31",
      ]
    `)
    expect(getDaysOfMonth('', FormatType.toSecond)).toMatchInlineSnapshot(`
      [
        "2022-08-01 00:00:00",
        "2022-08-31 23:59:59",
      ]
    `)
    expect(getDaysOfMonth(new Date())).toMatchInlineSnapshot(`
      [
        "2022-08-01",
        "2022-08-31",
      ]
    `)
    expect(getDaysOfMonth('2020/03/23')).toMatchInlineSnapshot(`
      [
        "2020-03-01",
        "2020-03-31",
      ]
    `)
    expect(getDaysOfMonth('2021')).toMatchInlineSnapshot(`
      [
        "2021-01-01",
        "2021-01-31",
      ]
    `)
  })

  it('getFirstDayOfYear', () => {
    expect(getFirstDayOfYear('2023')).toMatchInlineSnapshot('"2023-01-01"')
    expect(getFirstDayOfYear('', FormatType.toSecond)).toMatchInlineSnapshot('"2022-01-01 00:00:00"')
  })

  it('getDaysOfLastMonth', () => {
    expect(getDaysOfLastMonth()).toMatchInlineSnapshot(`
      [
        "2022-07-01",
        "2022-07-31",
      ]
    `)
  })

  it('getDaysOfWeek', () => {
    expect(getDaysOfWeek()).toMatchInlineSnapshot(`
      [
        "2022-08-14",
        "2022-08-20",
      ]
    `)
  })

  it('getDaysToNowOfMonth', () => {
    expect(getDaysToNowOfMonth()).toMatchInlineSnapshot(`
      [
        "2022-08-01",
        "2022-08-15",
      ]
    `)
    expect(getDaysToNowOfMonth('', FormatType.toMonth)).toMatchInlineSnapshot(`
      [
        "2022-08",
        "2022-08",
      ]
    `)
    expect(getDaysToNowOfMonth('2014')).toMatchInlineSnapshot(`
      [
        "2014-01-01",
        "2022-08-15",
      ]
    `)
  })

  it('isAfter', () => {
    expect(isAfter('20220807')).toMatchInlineSnapshot('false')
    expect(isAfter('20220807', '20210801')).toMatchInlineSnapshot('true')
    expect(isAfter(new Date(), '20210801')).toMatchInlineSnapshot('true')
  })

  it('isBefore', () => {
    expect(isBefore('20220805')).toMatchInlineSnapshot('true')
    expect(isBefore('20220807', '20210801')).toMatchInlineSnapshot('false')
    expect(isBefore(new Date(), '20210801')).toMatchInlineSnapshot('false')
  })

  it('isBetween', () => {
    expect(isBetween('20220801', '20221205')).toMatchInlineSnapshot('false')
    expect(isBetween('20220101', '20220501')).toMatchInlineSnapshot('true')
    expect(isBetween('20220101', '20220501', '20220302')).toMatchInlineSnapshot('"2022-08-16"')
  })

  it('addDays', () => {
    expect(addDays(1)).toMatchInlineSnapshot('"2022-07-12"')
    expect(addDays(2, '20220710')).toMatchInlineSnapshot('"2022-09-04 00:00:00"')
    expect(addDays(10, '20220825', FormatType.toSecond)).toMatchInlineSnapshot('"2022-08-14"')
  })

  it('subDays', () => {
    expect(subDays(1)).toMatchInlineSnapshot('"2022-08-13"')
    expect(subDays(2, '20220710')).toMatchInlineSnapshot('"2022-07-08"')
    expect(subDays(10, '20220902', FormatType.toSecond)).toMatchInlineSnapshot('"2022-08-23 00:00:00"')
  })
})
