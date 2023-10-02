import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type FindPlantByNameRepository,
  type AddPlantRepository,
  type AddPlantWaterFrequencyRepository,
  type AddEnvironmentRepository,
  type AddPlantEnvironmentRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly findPlantByNameRepository: FindPlantByNameRepository,
    private readonly addPlantWaterFrequencyRepository: AddPlantWaterFrequencyRepository,
    private readonly addPlantRepository: AddPlantRepository,
    private readonly addEnvironmentRepository: AddEnvironmentRepository,
    private readonly addPlantEnvironmentRepository: AddPlantEnvironmentRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const { plantWaterFrequency, ...restPlant } = input
    const plant = await this.findPlantByNameRepository.findByName(
      restPlant.name
    )
    const environmentsId: string[] = []
    const isValid = false
    if (plant === null) {
      const plantWaterFrequencyId =
        await this.addPlantWaterFrequencyRepository.add(plantWaterFrequency)
      const plantId = await this.addPlantRepository.add({
        ...restPlant,
        plantWaterFrequencyId,
      })

      for (const environment of restPlant.environments) {
        const environmentId = await this.addEnvironmentRepository.add(
          environment
        )
        environmentsId.push(environmentId)
      }

      for (const environmentId of environmentsId) {
        await this.addPlantEnvironmentRepository.add({
          plantId,
          environmentId,
        })
      }
    }
    return isValid
  }
}
