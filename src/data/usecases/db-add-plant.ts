import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type FindPlantByNameRepository,
  type AddPlantRepository,
  type AddPlantWaterFrequencyRepository,
  type AddEnvironmentRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly findPlantByNameRepository: FindPlantByNameRepository,
    private readonly addPlantWaterFrequencyRepository: AddPlantWaterFrequencyRepository,
    private readonly addPlantRepository: AddPlantRepository,
    private readonly addEnvironmentRepository: AddEnvironmentRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const { plantWaterFrequency, environments, ...restPlant } = input
    const plant = await this.findPlantByNameRepository.findByName(
      restPlant.name
    )
    const environmentsId: string[] = []
    let isValid = false
    if (plant === null) {
      for (const environment of environments) {
        const environmentId = await this.addEnvironmentRepository.add(
          environment
        )
        environmentsId.push(environmentId)
      }
      const plantWaterFrequencyId =
        await this.addPlantWaterFrequencyRepository.add(plantWaterFrequency)
      isValid = await this.addPlantRepository.add({
        ...restPlant,
        plantWaterFrequencyId,
      })
    }
    return isValid
  }
}
