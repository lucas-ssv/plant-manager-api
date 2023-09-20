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

  build(): z.ZodObject<any, 'strip', z.ZodTypeAny, any, any> {
    return this.schema
  }
}
