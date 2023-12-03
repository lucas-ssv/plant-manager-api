import { type FindEnvironmentByIdRepository } from '@/data/contracts'
import { mockEnvironment } from '@/tests/domain/mocks'

export class FindEnvironmentByIdSpy implements FindEnvironmentByIdRepository {
  input?: string
  output = mockEnvironment()

  async findById(id: string): Promise<FindEnvironmentByIdRepository.Result> {
    this.input = id
    return this.output
  }
}
