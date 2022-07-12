import { describe, expect, it } from 'vitest'
import { clearNull, clone } from '../src/object'

describe('object', () => {
  it('clearNull', () => {
    const user = {
      name: '',
      age: 18,
      address: null,
      a: undefined,
      b: [{
        a: undefined,
        b: [],
        c: null,
        d: '',
        e: '1',
        f: 0,
      }, {
        a: undefined,
        b: [],
        c: null,
        d: '',
        e: '1',
        f: 0,
      }, {
        a: undefined,
        b: [],
        c: null,
        d: '',
        e: '1',
        f: 0,
      }],
      c: {
        a: undefined,
        b: [],
        c: null,
        d: '',
        e: '1',
        f: 0,
      },
      d: [
        {
          a: undefined,
          b: [],
          c: null,
          d: '',
          e: '1',
          f: 1,
        }, {
          a: undefined,
          b: [],
          c: null,
          d: '',
          e: '2',
          f: 2,
        }, {
          a: undefined,
          b: [],
          c: null,
          d: '',
          e: '3',
          f: 3,
          g: {
            a: undefined,
            b: [],
            c: null,
            d: '',
            e: '1',
            f: 0,
          },
        },
      ],
    }

    expect(clearNull([])).toMatchInlineSnapshot('[]')
    expect(clearNull(123)).toMatchInlineSnapshot('123')
    expect(clearNull('123')).toMatchInlineSnapshot('"123"')
    expect(clearNull(true)).toMatchInlineSnapshot('true')

    expect(clearNull(user)).toMatchInlineSnapshot(`
      {
        "age": 18,
        "b": [
          {
            "e": "1",
            "f": 0,
          },
          {
            "e": "1",
            "f": 0,
          },
          {
            "e": "1",
            "f": 0,
          },
        ],
        "c": {
          "e": "1",
          "f": 0,
        },
        "d": [
          {
            "e": "1",
            "f": 1,
          },
          {
            "e": "2",
            "f": 2,
          },
          {
            "e": "3",
            "f": 3,
            "g": {
              "e": "1",
              "f": 0,
            },
          },
        ],
      }
    `)
  })

  it('clone', () => {
    const user = {
      name: '苏打水',
      age: 18,
      address: '北京 海淀区 上地十街10号',
      obj: {
        name: '苏打水',
        age: 18,
      },
      arr: [
        {
          name: '苏打水',
          age: 18,
        },
      ],
    }

    const cloneUser = clone(user)
    cloneUser.age = 19
    cloneUser.obj.age = 100
    cloneUser.arr[0].age = 110

    expect(user.age).toBe(18)
    expect(user.obj.age).toBe(18)
    expect(user.arr[0].age).toBe(18)
  })
})
