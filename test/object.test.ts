import { describe, expect, it } from 'vitest'
import { clone, getByPath, normalize, omit, omitBy, pick, pickBy } from '../src'

describe('object', () => {
  it('normalize', () => {
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

    expect(normalize([])).toMatchInlineSnapshot('[]')
    expect(normalize(123)).toMatchInlineSnapshot('123')
    expect(normalize('123')).toMatchInlineSnapshot('"123"')
    expect(normalize(true)).toMatchInlineSnapshot('true')

    expect(normalize(user)).toMatchInlineSnapshot(`
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

    const user2 = clone(user)

    expect(user === user2).toBe(false)
    user2.name = '苏打水2'
    expect(user.name).toBe('苏打水')
    expect(user2.name).toBe('苏打水2')
  })

  it('getByPath', () => {
    const user = {
      name: '苏打水',
      age: 18,
      address: '北京 海淀区 上地十街10号',
      obj: {
        name: '苏打水',
        age: 18,
      },
    }

    expect(getByPath(user, 'address')).toMatchInlineSnapshot('"北京 海淀区 上地十街10号"')
    expect(getByPath(user, 'address2')).toMatchInlineSnapshot('"no value"')
    expect(getByPath(user, 'obj.name')).toMatchInlineSnapshot('"苏打水"')
    expect(getByPath(user, 'obj.name2')).toMatchInlineSnapshot('"no value"')
  })

  it('omit', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toMatchInlineSnapshot(`
      {
        "c": 3,
      }
    `)
  })

  it('omitBy', () => {
    expect(omitBy({ a: 1, b: 2, c: 3 }, value => value > 1)).toMatchInlineSnapshot(`
      {
        "a": 1,
      }
    `)
  })

  it('pick', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": 2,
      }
    `)
  })

  it('pickBy', () => {
    expect(pickBy({ a: 1, b: 2, c: 3 }, value => value > 1)).toMatchInlineSnapshot(`
      {
        "b": 2,
        "c": 3,
      }
    `)
  })
})
