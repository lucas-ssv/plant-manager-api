import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { type AddPlantWaterFrequencyRepository } from '@/data/contracts'

import { faker } from '@faker-js/faker'

export class AddPlantWaterFrequencyRepositorySpy
  implements AddPlantWaterFrequencyRepository
{
  input?: AddPlantWaterFrequencyParams
  output = faker.string.alpha()

  async add(input: AddPlantWaterFrequencyParams): Promise<string> {
    this.input = input
    return this.output
  }
}
