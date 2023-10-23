import { type Plant } from '@/domain/entities'
import { type LoadPlants } from '@/domain/usecases'

import { type LoadPlantsRepository } from '@/data/contracts'

export class DbLoadPlants implements LoadPlants {
  constructor(private readonly loadPlantsRepository: LoadPlantsRepository) {}

  async perform(environment?: string): Promise<Plant[]> {
    return await this.loadPlantsRepository.loadMany(environment)
  }
}
