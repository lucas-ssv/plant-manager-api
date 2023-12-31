import {
  type LoadEnvironmentsRepository,
  type AddEnvironmentRepository,
  type FindEnvironmentByIdRepository,
  type FindEnvironmentByNameRepository,
} from '@/data/contracts'
import { type Environment } from '@/domain/entities'

import { prisma } from '@/infra/db/config'

export class SQLiteEnvironmentRepository
  implements
    AddEnvironmentRepository,
    LoadEnvironmentsRepository,
    FindEnvironmentByIdRepository,
    FindEnvironmentByNameRepository
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

  async findById(
    id: string
  ): Promise<FindEnvironmentByIdRepository.Result | null> {
    return await prisma.environment.findUnique({
      where: {
        id,
      },
    })
  }

  async findByName(
    name: string
  ): Promise<FindEnvironmentByNameRepository.Result | null> {
    return await prisma.environment.findFirst({
      where: {
        title: name,
      },
    })
  }
}
