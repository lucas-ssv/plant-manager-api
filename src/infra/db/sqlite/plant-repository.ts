import {
  type AddPlantRepository,
  type FindPlantByNameRepository,
} from '@/data/contracts'

import { prisma } from '@/infra/db'

export class SQLitePlantRepository
  implements FindPlantByNameRepository, AddPlantRepository
{
  async add(input: AddPlantRepository.AddParams): Promise<string> {
    const plant = await prisma.plant.create({
      data: input,
    })
    return plant.id
  }

  async findByName(name: string): Promise<FindPlantByNameRepository.Result> {
    const plant = await prisma.plant.findFirst({
      where: {
        name,
      },
      include: {
        PlantWaterFrequency: true,
        environments: {
          include: {
            environment: true,
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
          plantWaterFrequency: plant?.PlantWaterFrequency,
        } as any)
  }
}
