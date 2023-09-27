import { ZodValidatorBuilder } from '@/main/builders'

import { faker } from '@faker-js/faker'

describe('ZodValidatorBuilder', () => {
  it('should throw if field value is not string', () => {
    const sut = new ZodValidatorBuilder()

    const schema = sut.field('name').string().build()

    expect(() => schema.parse({ name: faker.number.int() })).toThrow()
    expect(() => schema.parse({ name: faker.string.alpha() })).not.toThrow()
  })

  it('should throw if field value is not object', () => {
    const sut = new ZodValidatorBuilder()
    const obj = {
      any_field: 'string',
      other_field: 'number',
    }
    const fieldName = faker.database.column()

    const schema = sut.field(fieldName).object(obj).build()

    expect(() => schema.parse({ object: faker.string.alpha() })).toThrow()
    expect(() =>
      schema.parse({
        [fieldName]: {
          any_field: faker.string.alpha(),
          other_field: faker.number.int(),
        },
      })
    ).not.toThrow()
  })
})
