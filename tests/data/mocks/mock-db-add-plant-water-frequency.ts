import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { type PlantWaterFrequencyRepository } from '@/data/contracts'

import { faker } from '@faker-js/faker'

export class PlantWaterFrequencyRepositorySpy
  implements PlantWaterFrequencyRepository
{
  input?: AddPlantWaterFrequencyParams
  output = faker.string.alpha()

  async add(input: AddPlantWaterFrequencyParams): Promise<string> {
    this.input = input
    return this.output
  }
}
