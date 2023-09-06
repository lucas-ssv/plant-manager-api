import { ZodValidatorAdapter } from '@/infra/validators'

import { faker } from '@faker-js/faker'

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

    it('should return true if field value is number', () => {
      const sut = new ZodValidatorAdapter()

      const isNumber = sut.isNumber(faker.number.int())

      expect(isNumber).toBe(true)
    })
  })
})
