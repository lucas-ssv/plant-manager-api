import { type LoadEnvironments } from '@/domain/usecases'
import { type Environment } from '@/domain/entities'

import { type LoadEnvironmentsRepository } from '@/data/contracts'

export class DbLoadEnvironments implements LoadEnvironments {
  constructor(
    private readonly loadEnvironmentsRepository: LoadEnvironmentsRepository
  ) {}

  async perform(): Promise<Environment[]> {
    return await this.loadEnvironmentsRepository.loadMany()
  }
}
