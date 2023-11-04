import { type AddPlant, type PlantParams } from '@/domain/usecases'

export class AddPlantSpy implements AddPlant {
  input?: PlantParams
  output = true

  async perform(input: PlantParams): Promise<boolean> {
    this.input = input
    return this.output
  }
}
