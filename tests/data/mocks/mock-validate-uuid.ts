import { type ValidateUuid } from '@/data/contracts'

export class ValidateUuidSpy implements ValidateUuid {
  input?: string
  output = false

  validate(value: string): boolean {
    this.input = value
    return this.output
  }
}
