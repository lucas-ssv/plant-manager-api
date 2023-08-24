import { type LoadPlantEnvironments } from '@/domain/usecases/load-plant-environments'

class DbLoadPlantEnvironments implements LoadPlantEnvironments {
  constructor(
    private readonly loadPlantEnvironmentsRepository: LoadPlantEnvironmentsRepositoryMock
  ) {}

  async perform(): Promise<void> {
    await this.loadPlantEnvironmentsRepository.loadMany()
  }
}

interface LoadPlantEnvironmentsRepository {
  loadMany: () => Promise<void>
}

class LoadPlantEnvironmentsRepositoryMock
  implements LoadPlantEnvironmentsRepository
{
  callsCount = 0

  async loadMany(): Promise<void> {
    this.callsCount++
  }
}

describe('DbLoadPlantEnvironments UseCase', () => {
  it('should call LoadPlantEnvironmentsRepository only once', async () => {
    const loadPlantEnvironmentsRepositoryMock =
      new LoadPlantEnvironmentsRepositoryMock()
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositoryMock)

    await sut.perform()

    expect(loadPlantEnvironmentsRepositoryMock.callsCount).toBe(1)
  })
})
