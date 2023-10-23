import { type AddEnvironmentRepository } from '@/data/contracts'

export class AddEnvironmentRepositorySpy implements AddEnvironmentRepository {
  input?: AddEnvironmentRepository.Params

  async add(input: AddEnvironmentRepository.Params): Promise<void> {
    this.input = input
  }
}
