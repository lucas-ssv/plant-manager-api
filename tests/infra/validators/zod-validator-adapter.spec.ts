import { faker } from '@faker-js/faker'
import { z } from 'zod'

class ZodValidatorAdapter {
  private schema: z.ZodObject<any, 'strip', z.ZodTypeAny, any, any>
  constructor(private readonly fieldName: string) {
    this.schema = z.object({})
  }

  static field(fieldName: string): ZodValidatorAdapter {
    return new ZodValidatorAdapter(fieldName)
  }

  string(): ZodValidatorAdapter {
    this.schema = this.schema.merge(
      z.object({
        [this.fieldName]: z.string(),
      })
    )
    return this
  }

  build(): z.ZodObject<any, 'strip', z.ZodTypeAny, any, any> {
    return this.schema
  }
}

describe('ZodValidatorAdapter', () => {
  it('should throw if field value is not string', () => {
    const sut = ZodValidatorAdapter
    const fieldName = faker.database.column()

    const schema = sut.field(fieldName).string().build()

    expect(() => schema.parse({ [fieldName]: faker.number.int() })).toThrow()
    expect(() =>
      schema.parse({ [fieldName]: faker.string.alpha() })
    ).not.toThrow()
  })
})
