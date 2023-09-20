import { ZodValidatorBuilder } from '@/main/builders'

import { faker } from '@faker-js/faker'

describe('ZodValidatorBuilder', () => {
  it('should throw if field value is not string', () => {
    const sut = new ZodValidatorBuilder()

    const schema = sut.field('name').string().build()

    expect(() => schema.parse({ name: faker.number.int() })).toThrow()
    expect(() => schema.parse({ name: faker.string.alpha() })).not.toThrow()
  })
})
