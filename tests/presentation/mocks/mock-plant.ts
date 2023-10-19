import { type Plant } from '@/domain/entities'
import {
  type LoadPlants,
  type AddPlant,
  type PlantParams,
} from '@/domain/usecases'
import { mockPlantModels } from '@/tests/domain/mocks'

export class AddPlantSpy implements AddPlant {
  input?: PlantParams
  output = true

  async perform(input: PlantParams): Promise<boolean> {
    this.input = input
    return this.output
  }
}

export class LoadPlantsSpy implements LoadPlants {
  callsCount = 0
  output = mockPlantModels()

  async perform(): Promise<Plant[]> {
    this.callsCount++
    return this.output
  }
}
