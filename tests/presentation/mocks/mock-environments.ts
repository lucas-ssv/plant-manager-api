import { type Environment } from '@/domain/entities'
import { type LoadEnvironments } from '@/domain/usecases'
import { mockEnvironmentsModel } from '@/tests/domain/mocks'

export class LoadEnvironmentsSpy implements LoadEnvironments {
  callsCount = 0
  output = mockEnvironmentsModel()

  async perform(): Promise<Environment[]> {
    this.callsCount++
    return this.output
  }
}
