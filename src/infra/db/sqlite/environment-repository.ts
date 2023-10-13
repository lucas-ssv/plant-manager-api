import { type AddEnvironmentRepository } from '@/data/contracts'

import { prisma } from '@/infra/db/config'

export class SQLiteEnvironmentRepository implements AddEnvironmentRepository {
  async add(input: string): Promise<string> {
    const environmentId = await prisma.environment.create({
      data: {
        title: input,
      },
    })
    return environmentId.id
  }
}
