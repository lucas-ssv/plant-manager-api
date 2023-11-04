import {
  type LoadPlantsByEnvironment,
  type AddPlant,
  type PlantParams,
} from '@/domain/usecases'
import { mockPlantsByEnvironment } from '@/tests/domain/mocks'

export class AddPlantSpy implements AddPlant {
  input?: PlantParams
  output = true

  async perform(input: PlantParams): Promise<boolean> {
    this.input = input
    return this.output
  }
}

export class LoadPlantsByEnvironmentSpy implements LoadPlantsByEnvironment {
  input?: string
  output = mockPlantsByEnvironment()

  async perform(
    environment?: string
  ): Promise<LoadPlantsByEnvironment.Result[]> {
    this.input = environment
    return this.output
  }
}
