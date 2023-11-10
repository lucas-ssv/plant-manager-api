import {
  type LoadEnvironmentsRepository,
  type AddEnvironmentRepository,
} from '@/data/contracts'
import { type Environment } from '@/domain/entities'

import { prisma } from '@/infra/db/config'

export class SQLiteEnvironmentRepository
  implements AddEnvironmentRepository, LoadEnvironmentsRepository
{
  async add(input: AddEnvironmentRepository.Params): Promise<string> {
    const environment = await prisma.environment.create({
      data: input,
    })
    return environment.id
  }

  async loadMany(): Promise<Environment[]> {
    return await prisma.environment.findMany()
  }
}
