import { describe, expect, it } from 'vitest'
import { invokeArrayAsyncFns, invokeArrayFns, params2Url, seconds2DayTime, seconds2Time } from '../src'

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

  it('invokeArrayFns', () => {
    const argObj = {
      a: 1,
      b: 2,
      c: 3,
    }

    function aFun(arg: any) {
      arg.a = arg.a + 1
      arg.b = arg.b + 2
      arg.c = arg.c + 3

      return arg
    }

    function bFun(arg: any) {
      arg.a = arg.a * 2
      arg.b = arg.b * 3
      arg.c = arg.c * 4
      return arg
    }

    function cFun(arg: any) {
      arg.a = arg.a - 10
      arg.b = arg.b - 15
      arg.c = arg.c - 20
      return arg
    }

    const data = invokeArrayFns([aFun, bFun, cFun], argObj)

    expect(argObj).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": 2,
        "c": 3,
      }
    `)

    expect(data).toMatchInlineSnapshot(`
      {
        "a": -6,
        "b": -3,
        "c": 4,
      }
    `)
  })

  it('invokeArrayAsyncFns', async () => {
    const argObj = {
      a: 1,
      b: 2,
      c: 3,
    }

    async function aFun(arg: any) {
      arg.a = arg.a + 1
      arg.b = arg.b + 2
      arg.c = arg.c + 3
      return arg
    }

    async function bFun(arg: any) {
      arg.a = arg.a * 2
      arg.b = arg.b * 3
      arg.c = arg.c * 4
      return arg
    }

    async function cFun(arg: any) {
      arg.a = arg.a - 10
      arg.b = arg.b - 15
      arg.c = arg.c - 20
      return arg
    }

    const data = await invokeArrayAsyncFns([aFun, cFun, bFun], argObj)

    expect(argObj).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": 2,
        "c": 3,
      }
    `)

    expect(data).toMatchInlineSnapshot(`
      {
        "a": -16,
        "b": -33,
        "c": -56,
      }
    `)
  })
})
