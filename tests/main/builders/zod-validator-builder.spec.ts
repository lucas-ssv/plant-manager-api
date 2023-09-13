import { ZodValidatorBuilder } from '@/main/builders'

import { faker } from '@faker-js/faker'

describe('ZodValidatorBuilder', () => {
  it('should throw if field value is not string', () => {
    const sut = ZodValidatorBuilder
    const fieldName = faker.database.column()

    const schema = sut.field(fieldName).string().build()

    expect(() => schema.parse({ [fieldName]: faker.number.int() })).toThrow()
    expect(() =>
      schema.parse({ [fieldName]: faker.string.alpha() })
    ).not.toThrow()
  })
})
