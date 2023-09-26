import { type AddPlantRepository } from '@/data/contracts'

export class AddPlantRepositoryMock implements AddPlantRepository {
  input?: AddPlantRepository.AddParams
  output = true

  async add(input: AddPlantRepository.AddParams): Promise<boolean> {
    this.input = input
    return this.output
  }
}
