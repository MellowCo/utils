/*
 * @Author: licl
 * @Date: 2022-07-20 11:39:40
 * @LastEditTime: 2022-12-02 10:16:28
 * @LastEditors: licl
 * @Description:
 */

import { describe, expect, it } from 'vitest'
import { DATE_FORMAT, addDays, formatDate, getDaysOfMonth, getFirstDayOfMonth, getFirstDayOfYear, isAfter, isBefore, isBetween, subDays } from '../src'

describe('date', () => {
  it('formatDate', () => {
    // const now = new Date()

    expect(formatDate('2022')).toMatchInlineSnapshot('"2022-01-01 00:00:00"')
    expect(formatDate('2022-03')).toMatchInlineSnapshot('"2022-03-01 00:00:00"')
    // expect(formatDate('', FormatType.toDay)).toMatchInlineSnapshot('"2022-10-14"')
    // expect(formatDate(now, FormatType.toDay)).toMatchInlineSnapshot('"2022-10-14"')
  })

  it('getFirstDayOfMonth', () => {
    // expect(getFirstDayOfMonth()).toMatchInlineSnapshot('"2022-10-01"')
    // expect(getFirstDayOfMonth('', FormatType.toSecond)).toMatchInlineSnapshot('"2022-10-01 00:00:00"')
    expect(getFirstDayOfMonth('2020/03/23')).toBe('2020-03-01')
    expect(getFirstDayOfMonth('2021')).toMatchInlineSnapshot('"2021-01-01"')
    expect(getFirstDayOfMonth('202207')).toMatchInlineSnapshot('"2022-07-01"')
  })

  it('getDaysOfMonth', () => {
    // expect(getDaysOfMonth()).toMatchInlineSnapshot(`
    //   [
    //     "2022-10-01",
    //     "2022-10-31",
    //   ]
    // `)
    // expect(getDaysOfMonth('', FormatType.toSecond)).toMatchInlineSnapshot(`
    //   [
    //     "2022-10-01 00:00:00",
    //     "2022-10-31 23:59:59",
    //   ]
    // `)
    // expect(getDaysOfMonth(new Date())).toMatchInlineSnapshot(`
    //   [
    //     "2022-10-01",
    //     "2022-10-31",
    //   ]
    // `)
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
    expect(getFirstDayOfYear('', DATE_FORMAT.TO_SECOND)).toMatchInlineSnapshot('"2022-01-01 00:00:00"')
  })

  it('getDaysOfLastMonth', () => {
    // expect(getDaysOfLastMonth()).toMatchInlineSnapshot(`
    //   [
    //     "2022-09-01",
    //     "2022-09-30",
    //   ]
    // `)
  })

  it('getDaysOfWeek', () => {
    // expect(getDaysOfWeek()).toMatchInlineSnapshot(`
    //   [
    //     "2022-10-09",
    //     "2022-10-15",
    //   ]
    // `)
  })

  it('getDaysToNowOfMonth', () => {
    // expect(getDaysToNowOfMonth()).toMatchInlineSnapshot(`
    //   [
    //     "2022-10-01",
    //     "2022-10-14",
    //   ]
    // `)
    // expect(getDaysToNowOfMonth('', FormatType.toMonth)).toMatchInlineSnapshot(`
    //   [
    //     "2022-10",
    //     "2022-10",
    //   ]
    // `)
    // expect(getDaysToNowOfMonth('2014')).toMatchInlineSnapshot(`
    //   [
    //     "2014-01-01",
    //     "2022-10-14",
    //   ]
    // `)
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
    expect(isBetween('20220801', '20221205')).toBe(true)
    expect(isBetween('20220101', '20220501')).toBe(false)
    expect(isBetween('20220101', '20220501', '20220302')).toBe(true)
  })

  it('addDays', () => {
    // expect(addDays(1)).toBe('2022-10-15')
    expect(addDays(2, '20220710')).toBe('2022-07-12')
    expect(addDays(10, '20220825', DATE_FORMAT.TO_SECOND)).toBe('2022-09-04 00:00:00')
  })

  it('subDays', () => {
    // expect(subDays(1)).toBe('2022-10-13')
    expect(subDays(2, '20220710')).toBe('2022-07-08')
    expect(subDays(10, '20220902', DATE_FORMAT.TO_SECOND)).toBe('2022-08-23 00:00:00')
  })
})
