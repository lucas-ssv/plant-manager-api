import { z } from 'zod'

export class ZodValidatorAdapter {
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
