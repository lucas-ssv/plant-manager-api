import { type Plant } from '@/domain/entities'
import { type LoadPlantsByEnvironment } from '@/domain/usecases'
import { mockPlantModels } from '@/tests/domain/mocks'

import { faker } from '@faker-js/faker'

class DbLoadPlantsByEnvironment implements LoadPlantsByEnvironment {
  constructor(
    private readonly loadPlantsByEnvironment: LoadPlantsByEnvironmentRepository
  ) {}

  async perform(
    environment: string
  ): Promise<LoadPlantsByEnvironmentRepository.Result[]> {
    return await this.loadPlantsByEnvironment.loadManyByEnvironment(environment)
  }
}

interface LoadPlantsByEnvironmentRepository {
  loadManyByEnvironment: (
    environment: string
  ) => Promise<LoadPlantsByEnvironmentRepository.Result[]>
}

namespace LoadPlantsByEnvironmentRepository {
  export interface Result extends Plant {}
}

class LoadPlantsByEnvironmentRepositorySpy
  implements LoadPlantsByEnvironmentRepository
{
  input?: string
  output = mockPlantModels()

  async loadManyByEnvironment(
    environment: string
  ): Promise<LoadPlantsByEnvironmentRepository.Result[]> {
    this.input = environment
    return this.output
  }
}

describe('DbLoadPlantsByEnvironment', () => {
  it('should call LoadPlantsByEnvironmentRepository with correct data', async () => {
    const loadPlantsByEnvironmentRepositorySpy =
      new LoadPlantsByEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsByEnvironment(
      loadPlantsByEnvironmentRepositorySpy
    )
    const fakeEnvironment = faker.lorem.word()

    await sut.perform(fakeEnvironment)

    expect(loadPlantsByEnvironmentRepositorySpy.input).toBe(fakeEnvironment)
  })

  it('should return a list of plants by environment on success', async () => {
    const loadPlantsByEnvironmentRepositorySpy =
      new LoadPlantsByEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsByEnvironment(
      loadPlantsByEnvironmentRepositorySpy
    )

    const plants = await sut.perform(faker.lorem.word())

    expect(loadPlantsByEnvironmentRepositorySpy.output).toEqual(plants)
  })
})
