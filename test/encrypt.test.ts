import { describe, expect, it } from 'vitest'
import { decrypt, encrypt } from '../src/index'

describe('encrypt', () => {
  it('aes-encrypt', () => {
    const user = {
      name: '苏打水',
      age: 18,
      address: '北京 海淀区 上地十街10号',
    }

    const encryptStr = JSON.stringify(user)
    const encryptKey = 'DICT_14'

    const encryptResult = encrypt(encryptStr, encryptKey)
    const decryptResult = decrypt(encryptResult, encryptKey)

    expect(encryptResult).toMatchInlineSnapshot('"ECJ3NjphB/0vNEJayiLtNdu0O3t1ZUKiL+b47QCJH7fJWJ1gHn0A6VB0FgToParNNW2NCn61MnqqIcEaJWP3Kx9NbtuCFDMx8cVG/u5V6BQ="')
    expect(JSON.parse(decryptResult)).toEqual(user)
  })
})
