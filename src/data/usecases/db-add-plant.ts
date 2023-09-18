import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type CheckPlantExistsRepository,
  type AddPlantRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly addPlantRepository: AddPlantRepository,
    private readonly checkPlantExistsRepository: CheckPlantExistsRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const isPlantExists = await this.checkPlantExistsRepository.check(
      input.name
    )
    let isValid = true
    if (!isPlantExists) {
      isValid = false
      await this.addPlantRepository.add(input)
    }
    return isValid
  }
}
