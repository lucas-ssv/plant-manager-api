import { type AddPlantEnvironmentRepository } from '@/data/contracts'
import { prisma } from '@/infra/db'

export class SQLitePlantEnvironmentRepository
  implements AddPlantEnvironmentRepository
{
  async add(input: AddPlantEnvironmentRepository.Params): Promise<void> {
    await prisma.plantEnvironment.create({
      data: {
        plantId: input.plantId,
        environmentId: input.environmentId,
      },
    })
  }
}
