import { type LoadPlantsEnvironment } from '@/domain/usecases'

import { type LoadPlantsEnvironmentRepository } from '@/data/contracts'

export class DbLoadPlantsEnvironment implements LoadPlantsEnvironment {
  constructor(
    private readonly loadPlantsEnvironmentRepository: LoadPlantsEnvironmentRepository
  ) {}

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result[]> {
    return await this.loadPlantsEnvironmentRepository.loadMany(environment)
  }
}
