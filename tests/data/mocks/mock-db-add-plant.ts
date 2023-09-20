import { type PlantParams } from '@/domain/usecases'

import { type PlantRepository } from '@/data/contracts'

export class AddPlantRepositoryMock implements PlantRepository {
  input?: PlantParams
  callsCount = 0

  async add(input: PlantParams): Promise<void> {
    this.input = input
    this.callsCount++
  }
}
