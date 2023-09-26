import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type FindPlantByNameRepository,
  type AddPlantRepository,
  type PlantWaterFrequencyRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly findPlantByNameRepository: FindPlantByNameRepository,
    private readonly addPlantWaterFrequencyRepository: PlantWaterFrequencyRepository,
    private readonly addPlantRepository: AddPlantRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const { name, plantWaterFrequency } = input
    const plant = await this.findPlantByNameRepository.findByName(name)
    let isValid = false
    if (plant === null) {
      await this.addPlantWaterFrequencyRepository.add(plantWaterFrequency)
      isValid = await this.addPlantRepository.add(input)
    }
    return isValid
  }
}
