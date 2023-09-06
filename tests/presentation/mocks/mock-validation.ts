import { type Validation } from '@/presentation/contracts'

export class ValidationSpy implements Validation {
  input?: object
  output?: Error

  validate(input: object): Error | undefined {
    this.input = input
    return this.output
  }
}
