import { describe, expect, it } from 'vitest'
import { params2Url, seconds2DayTime, seconds2Time } from '../src'

describe('misc', () => {
  it('seconds2Time', () => {
    expect(seconds2Time(366)).toMatchInlineSnapshot('"00:06:06"')
    expect(seconds2Time(11111)).toMatchInlineSnapshot('"03:05:11"')
  })

  it('seconds2DayTime', () => {
    expect(seconds2DayTime(366)).toMatchInlineSnapshot('"00:00:06:06"')
    expect(seconds2DayTime(60 * 60 * 24 * 3 + 60 * 60 * 3 + 60 + 10)).toMatchInlineSnapshot('"03:03:01:10"')
  })

  it('params2Url', () => {
    expect(params2Url({
      a: 1,
      b: 2,
    })).toMatchInlineSnapshot('"a=1&b=2"')

    expect(params2Url({
      a: 1,
      b: 2,
    }, true)).toMatchInlineSnapshot('"a%3D1%26b%3D2"')
  })
})
