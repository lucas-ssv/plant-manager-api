import {
  type LoadPlantsEnvironmentRepository,
  type AddPlantEnvironmentRepository,
} from '@/data/contracts'
import { prisma } from '@/infra/db'

export class SQLitePlantEnvironmentRepository
  implements AddPlantEnvironmentRepository, LoadPlantsEnvironmentRepository
{
  async add(input: AddPlantEnvironmentRepository.Params): Promise<void> {
    await prisma.plantEnvironment.create({
      data: {
        plantId: input.plantId,
        environmentId: input.environmentId,
      },
    })
  }

  async loadMany(
    environment?: string
  ): Promise<LoadPlantsEnvironmentRepository.Result[]> {
    const plantsEnvironment = await prisma.plantEnvironment.findMany({
      where: {
        environment: {
          title: environment,
        },
      },
      include: {
        plant: {
          include: {
            plantWaterFrequency: true,
          },
        },
        environment: true,
      },
    })
    const environmentData = plantsEnvironment[0].environment
    const plants = plantsEnvironment.map((item) => {
      const { plant } = item
      const { plantWaterFrequencyId, ...restPlant } = plant
      return { ...restPlant }
    })
    return [
      {
        environment: environmentData,
        plants,
      },
    ]
  }
}
