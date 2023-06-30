/*
 * @Author: licl
 * @Date: 2022-07-20 11:39:40
 * @LastEditTime: 2023-04-04 14:41:57
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { DATE_FORMAT, addDays, formatDate, getDaysOfLastMonth, getDaysOfMonth, getDaysOfWeek, getDaysToNowOfMonth, getFirstDayOfMonth, getFirstDayOfYear, isAfter, isBefore, isBetween, subDays } from '../src'

describe('date', () => {
  it('formatDate', () => {
    // const now = new Date()

    expect(formatDate('2022')).toMatchInlineSnapshot('"2022-01-01 00:00:00"')
    expect(formatDate('2022-03')).toMatchInlineSnapshot('"2022-03-01 00:00:00"')
  })

  it('getFirstDayOfMonth', () => {
    expect(getFirstDayOfMonth('2020/03/23')).toBe('2020-03-01')
    expect(getFirstDayOfMonth('2021')).toMatchInlineSnapshot('"2021-01-01"')
    expect(getFirstDayOfMonth('202207')).toMatchInlineSnapshot('"2022-07-01"')
  })

  it('getDaysOfMonth', () => {
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
    expect(getFirstDayOfYear('', DATE_FORMAT.TO_SECOND)).toMatchInlineSnapshot('"2023-01-01 00:00:00"')
  })

  it('getDaysOfLastMonth', () => {
    expect(getDaysOfLastMonth()).toMatchInlineSnapshot(`
      [
        "2023-05-01",
        "2023-05-31",
      ]
    `)
  })

  it('getDaysOfWeek', () => {
    expect(getDaysOfWeek()).toMatchInlineSnapshot(`
      [
        "2023-06-25",
        "2023-07-01",
      ]
    `)
  })

  it('getDaysToNowOfMonth', () => {
    expect(getDaysToNowOfMonth()).toMatchInlineSnapshot(`
      [
        "2023-06-01",
        "2023-06-30",
      ]
    `)
    expect(getDaysToNowOfMonth('', DATE_FORMAT.TO_MONTH)).toMatchInlineSnapshot(`
      [
        "2023-06",
        "2023-06",
      ]
    `)
    expect(getDaysToNowOfMonth('2014')).toMatchInlineSnapshot(`
      [
        "2014-01-01",
        "2023-06-30",
      ]
    `)
  })

  it('isAfter', () => {
    expect(isAfter('20220807')).toBe(true)
    expect(isAfter('20220807', '20210801')).toBe(false)
    expect(isAfter(new Date(), '20231201')).toBe(true)
  })

  it('isBefore', () => {
    expect(isBefore('20220805')).toBe(false)
    expect(isBefore('20220807', '20210801')).toBe(true)
    expect(isBefore(new Date(), '20231201')).toBe(false)
  })

  it('isBetween', () => {
    expect(isBetween('20220801', '20231205')).toBe(true)
    expect(isBetween('20220101', '20220501')).toBe(false)
    expect(isBetween('20220101', '20220501', '20220302')).toBe(true)
  })

  it('addDays', () => {
    expect(addDays(2, '20220710')).toBe('2022-07-12')
    expect(addDays(10, '20220825', DATE_FORMAT.TO_SECOND)).toBe('2022-09-04 00:00:00')
  })

  it('subDays', () => {
    // expect(subDays(1)).toBe('2022-10-13')
    expect(subDays(2, '20220710')).toBe('2022-07-08')
    expect(subDays(10, '20220902', DATE_FORMAT.TO_SECOND)).toBe('2022-08-23 00:00:00')
  })
})
