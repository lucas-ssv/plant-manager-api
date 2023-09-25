import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type FindPlantByNameRepository,
  type AddPlantRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly findPlantByNameRepository: FindPlantByNameRepository,
    private readonly addPlantRepository: AddPlantRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const plant = await this.findPlantByNameRepository.findByName(input.name)
    let isValid = false
    if (plant === null) {
      isValid = await this.addPlantRepository.add(input)
    }
    return isValid
  }
}
