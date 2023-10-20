import {
  type LoadPlantsRepository,
  type AddPlantRepository,
  type FindPlantByNameRepository,
} from '@/data/contracts'

import { prisma } from '@/infra/db'

export class SQLitePlantRepository
  implements
    FindPlantByNameRepository,
    AddPlantRepository,
    LoadPlantsRepository
{
  async add(input: AddPlantRepository.AddParams): Promise<string> {
    const plant = await prisma.plant.create({
      data: {
        name: input.name,
        description: input.description,
        photo: input.photo,
        waterTips: input.waterTips,
        plantWaterFrequencyId: input.plantWaterFrequencyId,
      },
    })
    return plant.id
  }

  async findByName(name: string): Promise<FindPlantByNameRepository.Result> {
    const plant = await prisma.plant.findFirst({
      where: {
        name,
      },
      include: {
        plantWaterFrequency: true,
        environments: {
          include: {
            plant: true,
          },
        },
      },
    })
    return plant === null
      ? null
      : ({
          id: plant?.id,
          name: plant?.name,
          description: plant?.description,
          environments: plant?.environments,
          photo: plant?.photo,
          waterTips: plant?.waterTips,
          plantWaterFrequency: plant?.plantWaterFrequency,
        } as any)
  }

  async loadMany(): Promise<LoadPlantsRepository.Result[]> {
    const plants = await prisma.plant.findMany({
      include: {
        plantWaterFrequency: true,
        environments: true,
      },
    })
    const plantsData = plants.map((plant) => {
      const { plantWaterFrequencyId, environments, ...restPlant } = plant
      const environmentsData = environments.map((environment) => {
        const { plantId, ...restEnvironment } = environment
        return restEnvironment
      })
      return {
        ...restPlant,
        environments: environmentsData,
      }
    })
    return plantsData
  }
}
