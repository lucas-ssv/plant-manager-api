import { type Plant } from '@/domain/entities'
import { mockPlantModels } from '@/tests/domain/mocks'

import { type LoadPlantsRepository } from '@/data/contracts'

export class LoadPlantsRepositorySpy implements LoadPlantsRepository {
  callsCount = 0
  output = mockPlantModels()

  async loadMany(): Promise<Plant[]> {
    this.callsCount++
    return this.output
  }
}
