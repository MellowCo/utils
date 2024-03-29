import dayjs from 'dayjs'
import { DATE_FORMAT } from './enum'

type DateFormat = DATE_FORMAT | string

type IDate = Date | string

/**
 * 格式化日期
 * @param date - 日期 默认为当天
 * @param format - 格式 默认为YYYY-MM-DD HH:mm
 * @example formatDate(null, 'YYYY-MM-DD') // 2023-04-04
 * @example formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // 2023-04-04 10:00:00
 * @example formatDate('2023-04-04', 'YYYY-MM-DD HH:mm:ss') // 2023-04-04 00:00:00
 */
export function formatDate(date?: IDate, format: DateFormat = DATE_FORMAT.TO_SECOND): string {
  if (!date)
    date = new Date()

  return dayjs(date).format(format)
}

/**
 * 获取当前时间
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getNow() // 2023-04-04
 */
export function getNow(format: DateFormat = DATE_FORMAT.TO_DAY): string {
  return dayjs().format(format)
}

/**
 * 获取月第一天
 * @param date - 日期 默认为当天
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getFirstDayOfMonth() // 2023-04-01
 */
export function getFirstDayOfMonth(date?: IDate, format: DateFormat = DATE_FORMAT.TO_DAY): string {
  if (!date)
    date = new Date()

  return dayjs(date).startOf('month').format(format)
}

/**
 * 获取月最后一天
 * @param date - 日期 默认为当天
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getLastDayOfMonth() // 2023-04-30
 * @example getLastDayOfMonth('2023-04-04') // 2023-04-30
 */
export function getLastDayOfMonth(date?: IDate, format: DateFormat = DATE_FORMAT.TO_DAY): string {
  if (!date)
    date = new Date()

  return dayjs(date).endOf('month').format(format)
}

/**
 * 获取整月
 * @param date - 日期 默认为当天
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getDaysOfMonth() // ['2023-04-01', '2023-04-30']
 * @example getDaysOfMonth('2023-04-04') // ['2023-04-01', '2023-04-30']
 */
export function getDaysOfMonth(date?: IDate, format: DateFormat = DATE_FORMAT.TO_DAY): string[] {
  return [getFirstDayOfMonth(date, format), getLastDayOfMonth(date, format)]
}

/**
 * 获取上个月
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getDaysOfLastMonth() // ['2023-03-01', '2023-03-31']
 * @example getDaysOfLastMonth('2023-04-04') // ['2023-03-01', '2023-03-31']
 */
export function getDaysOfLastMonth(format = DATE_FORMAT.TO_DAY): string[] {
  const month = dayjs().subtract(1, 'month').toDate()
  return [getFirstDayOfMonth(month, format), getLastDayOfMonth(month, format)]
}

/**
 * 获取月第一天 到 现在
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getDaysToNowOfMonth() // ['2023-04-01', '2023-04-04']
 * @example getDaysToNowOfMonth('2023-04-04') // ['2023-04-01', '2023-04-04']
 */
export function getDaysToNowOfMonth(date?: IDate, format = DATE_FORMAT.TO_DAY): string[] {
  return [getFirstDayOfMonth(date, format), getNow(format)]
}

/**
 * 获取年第一天
 * @param date - 日期 默认为当年
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getFirstDayOfYear() // 2023-01-01
 * @example getFirstDayOfYear('2023-04-04') // 2023-01-01
 */
export function getFirstDayOfYear(date?: IDate, format = DATE_FORMAT.TO_DAY): string {
  if (!date)
    date = new Date()

  return dayjs(date).startOf('year').format(format)
}

/**
 * 本周
 * @param format - 格式 默认为YYYY-MM-DD
 * @example getDaysOfWeek() // ['2023-04-04', '2023-04-10']
 */
export function getDaysOfWeek(format = DATE_FORMAT.TO_DAY): string[] {
  return [
    dayjs().startOf('week').format(format),
    dayjs().endOf('week').format(format),
  ]
}

/**
 * d2是否在d1之后
 * @param d1 - 日期1
 * @param d2 - 日期2 默认为当前时间
 * @example isAfter('2023-04-04') // true
 * @example isAfter('2023-04-04', '2023-04-03') // true
 */
export function isAfter(d1: IDate, d2: IDate = new Date()): boolean {
  return dayjs(d2).isAfter(d1)
}

/**
 * d2是否在d1之前
 * @param d1 - 日期1
 * @param d2 - 日期2 默认为当前时间
 * @example isBefore('2023-04-04') // false
 * @example isBefore('2023-04-04', '2023-04-03') // false
 */
export function isBefore(d1: IDate, d2: IDate = new Date()): boolean {
  return dayjs(d2).isBefore(d1)
}

/**
 * d3是否在d1与d2之间
 * @param d1 - 日期1
 * @param d2 - 日期2
 * @param d3 - 日期3 默认为当前时间
 * @example isBetween('2023-04-04', '2023-04-05') // true
 * @example isBetween('2023-04-04', '2023-04-05', '2023-04-06') // false
 */
export function isBetween(d1: IDate, d2: IDate, d3: IDate = new Date()): boolean {
  return isAfter(d1, d3) && isBefore(d2, d3)
}

/**
 * 加几天
 * @param days - 天数 默认为1
 * @param d - 日期 默认为当天
 * @param format - 格式 默认为YYYY-MM-DD
 * @example addDays() // 2023-04-05
 * @example addDays(2) // 2023-04-06
 */
export function addDays(days = 1, d: IDate = new Date(), format = DATE_FORMAT.TO_DAY): IDate {
  return dayjs(d).add(days, 'day').format(format)
}

/**
 * 减几天
 * @param days - 天数 默认为1
 * @param d - 日期 默认为当天
 * @param format - 格式 默认为YYYY-MM-DD
 * @example subDays() // 2023-04-03
 * @example subDays(2) // 2023-04-02
 */
export function subDays(days = 1, d: IDate = new Date(), format = DATE_FORMAT.TO_DAY): IDate {
  return dayjs(d).subtract(days, 'day').format(format)
}

/**
 * 转换成 Date
 * @param date - 日期
 * @example toDate('2023-04-04') // Date
 */
export function toDate(date: string | string[]) {
  if (typeof date === 'string')
    return dayjs(date).toDate()

  return date.map(item => dayjs(item).toDate())
}
