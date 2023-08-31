import { type PlantParams } from '@/domain/usecases'

import { type AddPlantRepository } from '@/data/contracts'

export class AddPlantRepositoryMock implements AddPlantRepository {
  input?: PlantParams
  callsCount = 0

  async add(input: PlantParams): Promise<void> {
    this.input = input
    this.callsCount++
  }
}
