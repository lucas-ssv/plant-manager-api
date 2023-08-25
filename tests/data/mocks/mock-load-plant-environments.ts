import { type PlantEnvironment } from '@/domain/entities'
import { mockPlantEnvironmentsModel } from '@/tests/domain/mocks'

import { type LoadPlantEnvironmentsRepository } from '@/data/contracts'

export class LoadPlantEnvironmentsRepositorySpy
  implements LoadPlantEnvironmentsRepository
{
  callsCount = 0
  output = mockPlantEnvironmentsModel()

  async loadMany(): Promise<PlantEnvironment[]> {
    this.callsCount++
    return this.output
  }
}
