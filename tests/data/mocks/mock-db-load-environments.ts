import { type Environment } from '@/domain/entities'
import { mockEnvironmentsModel } from '@/tests/domain/mocks'

import { type LoadEnvironmentsRepository } from '@/data/contracts'

export class LoadEnvironmentsRepositorySpy
  implements LoadEnvironmentsRepository
{
  callsCount = 0
  output = mockEnvironmentsModel()

  async loadMany(): Promise<Environment[]> {
    this.callsCount++
    return this.output
  }
}
