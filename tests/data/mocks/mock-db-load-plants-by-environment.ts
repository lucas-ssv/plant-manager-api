import { type LoadPlantsByEnvironmentRepository } from '@/data/contracts'

import { mockPlantsByEnvironment } from '@/tests/domain/mocks'

export class LoadPlantsByEnvironmentRepositorySpy
  implements LoadPlantsByEnvironmentRepository
{
  input?: string
  output = mockPlantsByEnvironment()

  async loadManyByEnvironment(
    environment?: string
  ): Promise<LoadPlantsByEnvironmentRepository.Result[]> {
    this.input = environment
    return this.output
  }
}
