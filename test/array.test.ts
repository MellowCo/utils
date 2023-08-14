import { describe, expect, it } from 'vitest'
import { all, allEqual, createArray, groupArrayByKey, insertAt, last, lastN, removeAt, removeByProp, removeDuplicates } from '../src'

describe('number', () => {
  it('removeAt', () => {
    const list = [1, 2, 3, 4, 5]
    removeAt(list, 3)

    expect(list).toEqual([1, 2, 4, 5])
  })

  it('insertAt', () => {
    const list = [1, 2, 3, 4, 5]
    insertAt(list, 2, 6, 6, 6)

    expect(list).toEqual([1, 2, 3, 6, 6, 6, 4, 5])
  })

  it('last', () => {
    expect(last([1, 2, 3])).toMatchInlineSnapshot('3')
    expect(last([])).toMatchInlineSnapshot('undefined')
    expect(last([null])).toMatchInlineSnapshot('null')
    expect(last([undefined])).toMatchInlineSnapshot('undefined')
  })

  it('lastN', () => {
    expect(lastN([1, 2, 3], 2)).toEqual([2, 3])
  })

  it('all', () => {
    expect(all([4, 2, 3], x => x > 1)).toBe(true)
    expect(all([0, 4, 2, 3], x => x > 1)).toBe(false)
  })

  it('allEqual', () => {
    expect(allEqual([1, 4, 2, 3])).toBe(false)
    expect(allEqual([0, 0, 0])).toBe(true)
  })

  it('createArray', () => {
    expect(createArray(3, 0)).toEqual([0, 0, 0])
  })

  it('removeDuplicates', () => {
    expect(removeDuplicates([1, 2, 3, 4, 2, 3])).toEqual([1, 2, 3, 4])
  })

  it('removeByProp', () => {
    expect(removeByProp([{ id: 1 }, { id: 2 }, { id: 2 }], 'id')).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
        },
        {
          "id": 2,
        },
      ]
    `)
  })

  it('groupArrayByKey', () => {
    const arr = [
      { classId: '1', name: '张三', age: 16 },
      { classId: '1', name: '李四', age: 15 },
      { classId: '2', name: '王五', age: 16 },
    ]

    expect(groupArrayByKey(arr, 'classId')).toMatchInlineSnapshot(`
      {
        "1": [
          {
            "age": 16,
            "classId": "1",
            "name": "张三",
          },
          {
            "age": 15,
            "classId": "1",
            "name": "李四",
          },
        ],
        "2": [
          {
            "age": 16,
            "classId": "2",
            "name": "王五",
          },
        ],
      }
    `)
  })
})
