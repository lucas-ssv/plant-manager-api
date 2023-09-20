import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type CheckPlantExistsRepository,
  type PlantRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly plantRepository: PlantRepository,
    private readonly checkPlantExistsRepository: CheckPlantExistsRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const isPlantExists = await this.checkPlantExistsRepository.check(
      input.name
    )
    let isValid = true
    if (!isPlantExists) {
      isValid = false
      await this.plantRepository.add(input)
    }
    return isValid
  }
}
