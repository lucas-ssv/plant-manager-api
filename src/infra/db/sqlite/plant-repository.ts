import { type PlantParams } from '@/domain/usecases'

import {
  type CheckPlantExistsRepository,
  type AddPlantRepository,
} from '@/data/contracts'

import { prisma } from '@/infra/db'

export class PlantRepository
  implements AddPlantRepository, CheckPlantExistsRepository
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
