import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { type AddPlantWaterFrequencyRepository } from '@/data/contracts'

export class DbAddPlantWaterFrequency {
  constructor(
    private readonly plantWaterFrequencyRepository: AddPlantWaterFrequencyRepository
  ) {}

  async perform(input: AddPlantWaterFrequencyParams): Promise<void> {
    await this.plantWaterFrequencyRepository.add(input)
  }
}
