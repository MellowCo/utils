/*
 * @Author: licl
 * @Date: 2022-07-20 11:28:43
 * @LastEditTime: 2022-07-27 20:55:54
 * @LastEditors: licl
 * @Description:
 */
import dayjs from 'dayjs'

export enum dateFormatTag {
  toMinute = 'YYYY-MM-DD HH:mm',
  toHour = 'YYYY-MM-DD HH',
  toDay = 'YYYY-MM-DD',
  toMonth = 'YYYY-MM',
  year = 'YYYY',
  toSecond = 'YYYY-MM-DD HH:mm:ss',
}

type DateTag = dateFormatTag | string

interface YearParams {
  /**
   * 日期
   */
  date?: Date | string
  /**
   * 年
   */
  year?: number
  /**
   * 月
   */
  month?: number
  /**
   * 格式化
   */
  format?: DateTag
  /**
   * 转为Date
   */
  toDate?: boolean
}

interface FormatType {
  dayjs: dayjs.Dayjs
  format?: DateTag
  toDate?: boolean
}

/**
 * 格式化日期
 * @param params
 * @returns
 */
export function formatDate(params?: YearParams): string | Date {
  const { date = new Date(), format = dateFormatTag.toSecond, toDate } = params || {}
  return returnDate({
    dayjs: dayjs(date),
    format,
    toDate,
  })
}

export function returnDate(params: FormatType): string | Date {
  const { dayjs, format, toDate } = params
  return toDate ? dayjs.toDate() : dayjs.format(format)
}

/**
 * 获取当前时间
 * @param {string} tag - 格式化标签
 * @returns
 */
export function getNow(tag: DateTag = dateFormatTag.toDay): string {
  return dayjs().format(tag)
}

/**
 * 获取月第一天
 * @param {object} params
 * @param {string} params.date - 日期
 * @param {string} params.tag - 格式化标签
 * @param {string} params.year - 年
 * @param {string} params.month - 月
 * @returns {string}
 */
export function getFirstDayOfMonth(params?: YearParams): string {
  const { date, year, month, format = dateFormatTag.toDay } = params || {}

  if (date)
    return dayjs(date).startOf('month').format(format)

  if (month || year) {
    let _dayjs = dayjs()
    if (month)
      _dayjs = _dayjs.month(month - 1)

    if (year)
      _dayjs = _dayjs.year(year)

    return _dayjs.startOf('month').format(format)
  }

  return dayjs().startOf('month').format(format)
}

/**
 * 获取月最后一天
 * @param {object} params
 * @param {string} params.date - 日期
 * @param {string} params.tag - 格式化标签
 * @param {string} params.year - 年
 * @param {string} params.month - 月
 * @returns {string}
 */
export function getLastDayOfMonth(params?: YearParams): string {
  const { date, year, month, format = dateFormatTag.toDay } = params || {}

  if (date)
    return dayjs(date).endOf('month').format(format)

  if (month || year) {
    let _dayjs = dayjs()
    if (month)
      _dayjs = _dayjs.month(month - 1)

    if (year)
      _dayjs = _dayjs.year(year)

    return _dayjs.endOf('month').format(format)
  }

  return dayjs().endOf('month').format(format)
}

/**
 * 获取整月
 * @param {object} params
 * @param {string} params.date - 日期
 * @param {string} params.tag - 格式化标签
 * @param {string} params.year - 年
 * @param {string} params.month - 月
 * @returns {string[]}
 */
export function getDaysOfMonth(params?: YearParams): string[] {
  return [getFirstDayOfMonth(params), getLastDayOfMonth(params)]
}

/**
 * 获取上个月
 * @param tag - 格式化标签
 */
export function getDaysOfLastMonth(format = dateFormatTag.toDay): string[] {
  const month = dayjs().month()
  return [getFirstDayOfMonth({ format, month }), getLastDayOfMonth({ format, month })]
}

/**
 * 获取月第一天 到 现在
 * @param {object} params
 * @param {string} params.date - 日期
 * @param {string} params.tag - 格式化标签
 * @param {string} params.year - 年
 * @param {string} params.month - 月
 * @returns {string}
 */
export function getDaysToNowOfMonth(params?: YearParams): string[] {
  const { format } = params || {}
  return [getFirstDayOfMonth(params), getNow(format)]
}

/**
 * 获取年第一天
 * @param {object} params
 * @param {string} params.year - 年
 * @param {string} params.tag - 格式化标签
 * @returns
 */
export function getFirstDayOfYear(params?: { year?: number; tag?: DateTag }): string {
  return getFirstDayOfMonth({ ...params, month: 1 })
}

/**
 * 本周
 * @param tag - 格式化标签
 */
export function getDaysOfWeek(tag = dateFormatTag.toDay): string[] {
  return [
    dayjs().startOf('week').format(tag),
    dayjs().endOf('week').format(tag),
  ]
}

