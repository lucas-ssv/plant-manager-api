import {
  type LoadPlantsRepository,
  type AddPlantEnvironmentRepository,
} from '@/data/contracts'
import { type Plant } from '@/domain/entities'

import { prisma } from '@/infra/db/config'

export class SQLitePlantEnvironmentRepository
  implements AddPlantEnvironmentRepository, LoadPlantsRepository
{
  async add(input: AddPlantEnvironmentRepository.Params): Promise<boolean> {
    const plantEnvironment = await prisma.plantEnvironment.create({
      data: {
        plantId: input.plantId,
        environmentId: input.environmentId,
      },
    })
    return plantEnvironment !== null
  }

  async loadMany(): Promise<Plant[]> {
    const plants = await prisma.plantEnvironment.findMany({
      include: {
        plant: {
          include: {
            PlantWaterFrequency: true,
          },
        },
        environment: true,
      },
    })
    const plantsData = plants.map((item) => {
      const { plant, environment } = item
      const { plantWaterFrequencyId, PlantWaterFrequency, ...restPlant } = plant
      return {
        ...restPlant,
        environments: [
          {
            id: environment.id,
            title: environment.title,
            createdAt: environment.createdAt,
            updatedAt: environment.updatedAt,
          },
        ],
        plantWaterFrequency: PlantWaterFrequency,
      }
    })
    return plantsData
  }
}
