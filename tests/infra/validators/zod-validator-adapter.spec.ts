import { faker } from '@faker-js/faker'
import { z } from 'zod'

class ZodValidatorAdapter {
  isString(fieldValue: any): boolean {
    return z.string().safeParse(fieldValue).success
  }
}

describe('ZodValidator Adapter', () => {
  it('should return false if field value is not string', () => {
    const sut = new ZodValidatorAdapter()
    const fieldValue = faker.number.int()

    const isString = sut.isString(fieldValue)

    expect(isString).toBe(false)
  })
})
