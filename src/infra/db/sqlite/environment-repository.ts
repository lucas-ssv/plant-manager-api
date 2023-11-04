import {
  type LoadPlantsByEnvironmentRepository,
  type AddEnvironmentRepository,
} from '@/data/contracts'

import { prisma } from '@/infra/db/config'

export class SQLiteEnvironmentRepository
  implements AddEnvironmentRepository, LoadPlantsByEnvironmentRepository
{
  async add(input: AddEnvironmentRepository.Params): Promise<void> {
    await prisma.environment.create({
      data: input,
    })
  }

  async loadManyByEnvironment(
    environment?: string
  ): Promise<LoadPlantsByEnvironmentRepository.Result[]> {
    const plantsByEnvironment = await prisma.environment.findMany({
      where: {
        title: environment,
      },
      include: {
        plant: {
          include: {
            plantWaterFrequency: true,
          },
        },
      },
    })
    const data = plantsByEnvironment.map((plant) => {
      const { plantId, ...restData } = plant
      return { ...restData }
    })
    return data as any
  }
}
