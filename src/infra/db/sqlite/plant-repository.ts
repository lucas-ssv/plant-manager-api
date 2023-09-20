import { type PlantParams } from '@/domain/usecases'

import {
  type CheckPlantExistsRepository,
  type PlantRepository,
} from '@/data/contracts'

import { prisma } from '@/infra/db'

export class SQLitePlantRepository
  implements PlantRepository, CheckPlantExistsRepository
{
  async add(input: PlantParams): Promise<void> {
    await prisma.plant.create({
      data: input,
    })
  }

  async check(name: string): Promise<boolean> {
    const plant = await prisma.plant.findFirst({
      where: {
        name,
      },
    })
    return plant instanceof Object
  }
}
