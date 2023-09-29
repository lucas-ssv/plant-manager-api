import { type AddPlantRepository } from '@/data/contracts'
import { faker } from '@faker-js/faker'

export class AddPlantRepositoryMock implements AddPlantRepository {
  input?: AddPlantRepository.AddParams
  output = faker.string.uuid()

  async add(input: AddPlantRepository.AddParams): Promise<string> {
    this.input = input
    return this.output
  }
}
