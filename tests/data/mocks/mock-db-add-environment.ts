import { type AddEnvironmentRepository } from '@/data/contracts'

import { faker } from '@faker-js/faker'

export class AddEnvironmentRepositorySpy implements AddEnvironmentRepository {
  input?: string
  output = faker.string.uuid()

  async add(input: string): Promise<string> {
    this.input = input
    return this.output
  }
}
