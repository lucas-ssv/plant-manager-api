import { type PlantParams, type AddPlant } from '@/domain/usecases'

import { type PlantRepository } from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(private readonly plantRepository: PlantRepository) {}

  async perform(input: PlantParams): Promise<boolean> {
    const plant = await this.plantRepository.findByName(input.name)
    let isValid = true
    if (plant === null) {
      isValid = false
      await this.plantRepository.add(input)
    }
    return isValid
  }
}
