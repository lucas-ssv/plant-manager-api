import { type AddEnvironmentRepository } from '@/data/contracts'

import { faker } from '@faker-js/faker'

export class AddEnvironmentRepositorySpy implements AddEnvironmentRepository {
  input?: AddEnvironmentRepository.Params
  callsCount = 0
  output = faker.string.uuid()

  async add(input: AddEnvironmentRepository.Params): Promise<string> {
    this.input = input
    this.callsCount++
    return this.output
  }
}
