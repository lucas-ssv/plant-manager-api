import { type Plant } from '@/domain/entities'
import { type AddPlant } from '@/domain/usecases'

import { type AddPlantRepository } from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly addPlantRepository: AddPlantRepository,
    private readonly checkPlantExistsRepository: any
  ) {}

  async perform(input: Plant): Promise<boolean> {
    await this.checkPlantExistsRepository.some(input.id)
    await this.addPlantRepository.load(input)
    return true
  }
}
