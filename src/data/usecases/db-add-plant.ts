import { type PlantParams, type AddPlant } from '@/domain/usecases'

import {
  type FindPlantByNameRepository,
  type AddPlantRepository,
  type AddPlantWaterFrequencyRepository,
  type AddEnvironmentRepository,
  type AddPlantEnvironmentRepository,
  type ValidateUuid,
  type FindEnvironmentByIdRepository,
  type FindEnvironmentByNameRepository,
} from '@/data/contracts'

export class DbAddPlant implements AddPlant {
  constructor(
    private readonly findPlantByNameRepository: FindPlantByNameRepository,
    private readonly addPlantWaterFrequencyRepository: AddPlantWaterFrequencyRepository,
    private readonly addPlantRepository: AddPlantRepository,
    private readonly validateUuid: ValidateUuid,
    private readonly addEnvironmentRepository: AddEnvironmentRepository,
    private readonly addPlantEnvironmentRepository: AddPlantEnvironmentRepository,
    private readonly findEnvironmentById: FindEnvironmentByIdRepository,
    private readonly findEnvironmentByName: FindEnvironmentByNameRepository
  ) {}

  async perform(input: PlantParams): Promise<boolean> {
    const { plantWaterFrequency, environments, ...restPlant } = input
    const plant = await this.findPlantByNameRepository.findByName(
      restPlant.name
    )
    let isValid = false
    if (plant === null) {
      const plantWaterFrequencyId =
        await this.addPlantWaterFrequencyRepository.add(plantWaterFrequency)
      const plantId = await this.addPlantRepository.add({
        ...restPlant,
        plantWaterFrequencyId,
      })
      isValid = true
      for (const environment of environments) {
        const isUuid = this.validateUuid.validate(environment)
        if (!isUuid) {
          const environmentExists = await this.findEnvironmentByName.findByName(
            environment
          )
          if (environmentExists === null) {
            const environmentId = await this.addEnvironmentRepository.add({
              title: environment,
            })
            await this.addPlantEnvironmentRepository.add({
              plantId,
              environmentId,
            })
          } else {
            await this.addPlantEnvironmentRepository.add({
              plantId,
              environmentId: environmentExists.id,
            })
          }
          isValid = true
        } else {
          const exists = await this.findEnvironmentById.findById(environment)
          if (exists !== null) {
            await this.addPlantEnvironmentRepository.add({
              plantId,
              environmentId: environment,
            })
            isValid = true
          } else {
            isValid = false
          }
        }
      }
    }
    return isValid
  }
}
