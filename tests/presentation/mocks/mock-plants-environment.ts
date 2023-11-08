import { type LoadPlantsEnvironment } from '@/domain/usecases'
import { plantsEnvironmentModel } from '@/tests/domain/mocks'

export class LoadPlantsEnvironmentSpy implements LoadPlantsEnvironment {
  input?: string
  output = plantsEnvironmentModel()

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result[]> {
    this.input = environment
    return this.output
  }
}
