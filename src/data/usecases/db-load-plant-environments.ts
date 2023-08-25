import { type LoadPlantEnvironments } from '@/domain/usecases'
import { type PlantEnvironment } from '@/domain/entities'

import { type LoadPlantEnvironmentsRepository } from '@/data/contracts'

export class DbLoadPlantEnvironments implements LoadPlantEnvironments {
  constructor(
    private readonly loadPlantEnvironmentsRepository: LoadPlantEnvironmentsRepository
  ) {}

  async perform(): Promise<PlantEnvironment[]> {
    return await this.loadPlantEnvironmentsRepository.loadMany()
  }
}
