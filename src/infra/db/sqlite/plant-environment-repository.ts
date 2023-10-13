import { type AddPlantEnvironmentRepository } from '@/data/contracts'

import { prisma } from '@/infra/db/config'

export class SQLitePlantEnvironmentRepository
  implements AddPlantEnvironmentRepository
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
}
