import { type Plant } from '@/domain/entities'

import { type AddPlantRepository } from '@/data/contracts'

export class AddPlantRepositoryMock implements AddPlantRepository {
  input?: Plant
  callsCount = 0

  async add(input: Plant): Promise<void> {
    this.input = input
    this.callsCount++
  }
}
