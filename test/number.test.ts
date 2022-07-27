import { describe, expect, it } from 'vitest'
import { toNumber } from '../src'

describe('number', () => {
  it('toNumber', () => {
    expect(toNumber('user-info')).toBe('user-info')
    expect(toNumber('3.1415')).toBe(3.1415)
    expect(toNumber('2')).toBe(2)
    expect(toNumber('2.0')).toBe(2)
  })
})
