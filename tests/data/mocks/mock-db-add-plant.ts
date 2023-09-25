import { type PlantParams } from '@/domain/usecases'

import { type AddPlantRepository } from '@/data/contracts'

export class AddPlantRepositoryMock implements AddPlantRepository {
  input?: PlantParams
  callsCount = 0
  output = true

  async add(input: PlantParams): Promise<boolean> {
    this.input = input
    this.callsCount++
    return this.output
  }
}
