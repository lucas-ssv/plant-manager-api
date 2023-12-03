import { type AddPlantEnvironmentRepository } from '@/data/contracts'

import { type AddPlantEnvironment } from '@/domain/usecases'

export class AddPlantEnvironmentRepositoryMock
  implements AddPlantEnvironmentRepository
{
  input?: AddPlantEnvironment.Params

  async add(input: AddPlantEnvironmentRepository.Params): Promise<void> {
    this.input = input
  }
}
