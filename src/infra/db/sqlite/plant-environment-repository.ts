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
    const environmentsId = await prisma.plantEnvironment.groupBy({
      by: ['environmentId'],
    })
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
    const plants: LoadPlantsEnvironmentRepository.Result[] = []
    environmentsId.forEach((item) => {
      const items = plantsEnvironment.filter(
        (p) => p.environmentId === item.environmentId
      )
      if (items.length === 0) return
      if (items.length > 1) {
        const plantsResult: any = []
        items.forEach((item) => {
          const { plant } = item
          const { plantWaterFrequencyId, ...restPlant } = plant
          plantsResult.push(restPlant)
        })
        plants.push({ plants: plantsResult, environment: items[0].environment })
      } else {
        items.forEach((i) => {
          const { plant, environment } = i
          const { plantWaterFrequencyId, ...restPlant } = plant
          plants.push({ plants: [restPlant], environment })
        })
      }
    })
    return plants
  }
}
