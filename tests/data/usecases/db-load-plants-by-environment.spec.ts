import { faker } from '@faker-js/faker'

class DbLoadPlantsByEnvironment {
  constructor(
    private readonly loadPlantsByEnvironment: LoadPlantsByEnvironmentRepository
  ) {}

  async perform(environment: string): Promise<void> {
    await this.loadPlantsByEnvironment.loadManyByEnvironment(environment)
  }
}

interface LoadPlantsByEnvironmentRepository {
  loadManyByEnvironment: (environment: string) => Promise<void>
}

class LoadPlantsByEnvironmentRepositoryMock
  implements LoadPlantsByEnvironmentRepository
{
  input?: string

  async loadManyByEnvironment(environment: string): Promise<void> {
    this.input = environment
  }
}

describe('DbLoadPlantsByEnvironment', () => {
  it('should call LoadPlantsByEnvironmentRepository with correct data', async () => {
    const loadPlantsByEnvironmentRepositoryMock =
      new LoadPlantsByEnvironmentRepositoryMock()
    const sut = new DbLoadPlantsByEnvironment(
      loadPlantsByEnvironmentRepositoryMock
    )
    const fakeEnvironment = faker.lorem.word()

    await sut.perform(fakeEnvironment)

    expect(loadPlantsByEnvironmentRepositoryMock.input).toBe(fakeEnvironment)
  })
})
