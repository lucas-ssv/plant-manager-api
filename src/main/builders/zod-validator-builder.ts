import { z } from 'zod'

export class ZodValidatorBuilder {
  private schema
  private fieldName

  constructor() {
    this.schema = z.object({})
    this.fieldName = ''
  }

  field(fieldName: string): ZodValidatorBuilder {
    this.fieldName = fieldName
    return this
  }

  string(): ZodValidatorBuilder {
    this.schema = this.schema.extend({
      [this.fieldName]: z.string(),
    })
    return this
  }

  object(obj: object): ZodValidatorBuilder {
    const validations: z.ZodRawShape = {}
    for (const field of Object.entries(obj)) {
      switch (field[1]) {
        case 'string':
          validations[field[0]] = z.string()
          break
        case 'number':
          validations[field[0]] = z.number()
          break
      }
    }
    const shape = z.object(validations)
    this.schema = this.schema.extend({
      [this.fieldName]: shape,
    })
    return this
  }

  build(): z.ZodObject<any, 'strip', z.ZodTypeAny, any, any> {
    return this.schema
  }
}
