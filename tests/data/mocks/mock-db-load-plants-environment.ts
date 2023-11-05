import { type LoadPlantsEnvironmentRepository } from '@/data/contracts'

import { plantsEnvironmentModel } from '@/tests/domain/mocks'

export class LoadPlantsEnvironmentRepositorySpy
  implements LoadPlantsEnvironmentRepository
{
  input?: string
  callsCount = 0
  output = plantsEnvironmentModel()

  async loadMany(
    environment?: string
  ): Promise<LoadPlantsEnvironmentRepository.Result[]> {
    this.input = environment
    this.callsCount++
    return this.output
  }
}
