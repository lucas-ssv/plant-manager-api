import { type PlantParams } from '@/domain/usecases'

import { type PlantRepository } from '@/data/contracts'
import { type Plant } from '@/domain/entities'

export class PlantRepositoryMock implements PlantRepository {
  input?: PlantParams
  callsCount = 0
  output: Plant | null = null

  async add(input: PlantParams): Promise<void> {
    this.input = input
    this.callsCount++
  }

  async findByName(name: string): Promise<Plant | null> {
    return this.output
  }
}
