import { describe, expect, it } from 'vitest'
import { seconds2DayTime, seconds2Time } from '../src'

describe('misc', () => {
  it('seconds2Time', () => {
    expect(seconds2Time(366)).toMatchInlineSnapshot('"00:06:06"')
    expect(seconds2Time(11111)).toMatchInlineSnapshot('"03:05:11"')
  })

  it('seconds2DayTime', () => {
    expect(seconds2DayTime(366)).toMatchInlineSnapshot('"00:00:06:06"')
    expect(seconds2DayTime(60 * 60 * 24 * 3 + 60 * 60 * 3 + 60 + 10)).toMatchInlineSnapshot('"03:03:01:10"')
  })
})
