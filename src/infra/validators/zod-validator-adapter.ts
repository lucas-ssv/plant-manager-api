import { type Validation } from '@/validation/contracts'

import { z } from 'zod'

export class ZodValidatorAdapter implements Validation {
  isString(fieldValue: any): boolean {
    return z.string().safeParse(fieldValue).success
  }

  isNumber(fieldValue: any): boolean {
    return z.number().safeParse(fieldValue).success
  }
}
