import { type LoadPlantsByEnvironmentRepository } from '@/data/contracts'

import { mockPlantModels } from '@/tests/domain/mocks'

export class LoadPlantsByEnvironmentRepositorySpy
  implements LoadPlantsByEnvironmentRepository
{
  input?: string
  output = mockPlantModels()

  async loadManyByEnvironment(
    environment: string
  ): Promise<LoadPlantsByEnvironmentRepository.Result[]> {
    this.input = environment
    return this.output
  }
}
