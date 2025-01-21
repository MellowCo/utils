import { describe, expect, it } from 'vitest'
import { groupArrayByKey, invokeArrayAsyncFns, invokeArrayFns, isMobileAgent, obj2Url, seconds2DayTime, seconds2Time, toCurryFunc } from '../src'

describe('misc', () => {
  it('seconds2Time', () => {
    expect(seconds2Time(366)).toMatchInlineSnapshot('"00:06:06"')
    expect(seconds2Time(11111)).toMatchInlineSnapshot('"03:05:11"')
  })

  it('seconds2DayTime', () => {
    expect(seconds2DayTime(366)).toMatchInlineSnapshot('"00:00:06:06"')
    expect(seconds2DayTime(60 * 60 * 24 * 3 + 60 * 60 * 3 + 60 + 10)).toMatchInlineSnapshot('"03:03:01:10"')
  })

  it('obj2Url', () => {
    expect(obj2Url({
      a: 1,
      b: 2,
    })).toMatchInlineSnapshot('"a=1&b=2"')

    expect(obj2Url({
      a: 1,
      b: 2,
    }, true)).toMatchInlineSnapshot('"a%3D1%26b%3D2"')
  })

  it('invokeArrayFns Object Args', () => {
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

    expect(argObj === data).toMatchInlineSnapshot('false')

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

  it('invokeArrayFns Args', () => {
    function aFun(arg: any) {
      return arg + 10
    }

    function bFun(arg: any) {
      return arg + 20
    }

    function cFun(arg: any) {
      return arg + 30
    }

    const data1 = invokeArrayFns([aFun, bFun, cFun], '23')
    const data2 = invokeArrayFns([aFun, bFun, cFun], 10)

    expect(data1).toMatchInlineSnapshot('"23102030"')
    expect(data2).toMatchInlineSnapshot('70')
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

  it('userAgent is mobile', () => {
    const edgePcAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62'

    const iPhoneAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/111.0.0.0'

    const iPadAgent = 'Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1 Edg/111.0.0.0'

    const androidAgent = 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36 Edg/111.0.0.0'

    expect(isMobileAgent(edgePcAgent)).toBe(false)
    expect(isMobileAgent(iPhoneAgent)).toBe(true)
    expect(isMobileAgent(iPadAgent)).toBe(true)
    expect(isMobileAgent(androidAgent)).toBe(true)
  })

  it('groupArrayByKey', () => {
    const arr = [
      { classId: '1', name: '张三', age: 16 },
      { classId: '1', name: '李四', age: 15 },
      { classId: '2', name: '王五', age: 16 },
      { classId: '3', name: '赵六', age: 15 },
      { classId: '2', name: '孔七', age: 16 },
    ]

    expect(groupArrayByKey(arr, 'name')).toMatchInlineSnapshot(`
      {
        "孔七": [
          {
            "age": 16,
            "classId": "2",
            "name": "孔七",
          },
        ],
        "张三": [
          {
            "age": 16,
            "classId": "1",
            "name": "张三",
          },
        ],
        "李四": [
          {
            "age": 15,
            "classId": "1",
            "name": "李四",
          },
        ],
        "王五": [
          {
            "age": 16,
            "classId": "2",
            "name": "王五",
          },
        ],
        "赵六": [
          {
            "age": 15,
            "classId": "3",
            "name": "赵六",
          },
        ],
      }
    `)
  })

  it('toCurryFunc', () => {
    const add = (a: number, b: number) => a + b
    const curriedAdd = toCurryFunc<number>(add)

    expect(curriedAdd(1)(2)).toMatchInlineSnapshot('3')
    expect(curriedAdd(1, 2)).toMatchInlineSnapshot('3')
  })
})
