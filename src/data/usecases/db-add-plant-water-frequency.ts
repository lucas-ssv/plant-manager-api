import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { type PlantWaterFrequencyRepository } from '@/data/contracts'

export class DbAddPlantWaterFrequency {
  constructor(
    private readonly plantWaterFrequencyRepository: PlantWaterFrequencyRepository
  ) {}

  async perform(input: AddPlantWaterFrequencyParams): Promise<void> {
    await this.plantWaterFrequencyRepository.add(input)
  }
}
