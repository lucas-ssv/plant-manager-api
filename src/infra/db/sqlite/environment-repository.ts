import { type AddEnvironmentRepository } from '@/data/contracts'

import { prisma } from '@/infra/db/config'

export class EnvironmentRepository implements AddEnvironmentRepository {
  async add(input: AddEnvironmentRepository.Params): Promise<boolean> {
    let result
    for (const environment of input.environments) {
      result = await prisma.environment.create({
        data: {
          title: environment,
        },
      })
    }
    return result !== null
  }
}
