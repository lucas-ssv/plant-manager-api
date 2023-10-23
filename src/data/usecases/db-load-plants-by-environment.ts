import { type LoadPlantsByEnvironment } from '@/domain/usecases'

import { type LoadPlantsByEnvironmentRepository } from '@/data/contracts'

export class DbLoadPlantsByEnvironment implements LoadPlantsByEnvironment {
  constructor(
    private readonly loadPlantsByEnvironment: LoadPlantsByEnvironmentRepository
  ) {}

  async perform(
    environment: string
  ): Promise<LoadPlantsByEnvironmentRepository.Result[]> {
    return await this.loadPlantsByEnvironment.loadManyByEnvironment(environment)
  }
}
