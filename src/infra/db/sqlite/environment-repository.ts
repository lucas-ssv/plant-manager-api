import { type AddEnvironmentRepository } from '@/data/contracts'

import { prisma } from '@/infra/db/config'

export class SQLiteEnvironmentRepository implements AddEnvironmentRepository {
  async add(input: AddEnvironmentRepository.Params): Promise<void> {
    await prisma.environment.create({
      data: input,
    })
  }
}
