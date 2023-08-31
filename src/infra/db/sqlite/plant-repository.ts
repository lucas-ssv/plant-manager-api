import { type PlantParams } from '@/domain/usecases'

import { type AddPlantRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

export class PlantRepository implements AddPlantRepository {
  async add(input: PlantParams): Promise<void> {
    await prisma.plant.create({
      data: input,
    })
  }
}
