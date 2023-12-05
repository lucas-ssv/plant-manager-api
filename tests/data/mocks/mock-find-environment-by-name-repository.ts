import { type FindEnvironmentByNameRepository } from '@/data/contracts'

export class FindEnvironmentByNameRepositorySpy
  implements FindEnvironmentByNameRepository
{
  input?: string
  output = null

  async findByName(
    name: string
  ): Promise<FindEnvironmentByNameRepository.Result | null> {
    this.input = name
    return this.output
  }
}
