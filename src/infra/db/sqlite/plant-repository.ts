import { type PlantParams } from '@/domain/usecases'
import { type Plant } from '@/domain/entities'

import { type PlantRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

export class SQLitePlantRepository implements PlantRepository {
  async add(input: PlantParams): Promise<void> {
    await prisma.plant.create({
      data: input,
    })
  }

  async findByName(name: string): Promise<Plant> {
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
