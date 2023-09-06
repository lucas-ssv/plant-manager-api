import { faker } from '@faker-js/faker'
import { z } from 'zod'

class ZodValidatorAdapter {
  isString(fieldValue: any): boolean {
    return z.string().safeParse(fieldValue).success
  }

  isNumber(fieldValue: any): boolean {
    return false
  }
}

describe('ZodValidator Adapter', () => {
  describe('isString()', () => {
    it('should return false if field value is not string', () => {
      const sut = new ZodValidatorAdapter()

      const isString = sut.isString(faker.number.int())

      expect(isString).toBe(false)
    })

    it('should return true if field value is string', () => {
      const sut = new ZodValidatorAdapter()

      const isString = sut.isString(faker.string.alpha())

      expect(isString).toBe(true)
    })
  })

  describe('isNumber()', () => {
    it('should return false if field value is not number', () => {
      const sut = new ZodValidatorAdapter()

      const isNumber = sut.isNumber(faker.string.alpha())

      expect(isNumber).toBe(false)
    })
  })
})
