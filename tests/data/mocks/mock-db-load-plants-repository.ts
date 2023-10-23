import { type Plant } from '@/domain/entities'
import { mockPlantModels } from '@/tests/domain/mocks'

import { type LoadPlantsRepository } from '@/data/contracts'

export class LoadPlantsRepositorySpy implements LoadPlantsRepository {
  input?: string
  callsCount = 0
  output = mockPlantModels()

  async loadMany(environment?: string): Promise<Plant[]> {
    this.input = environment
    this.callsCount++
    return this.output
  }
}
