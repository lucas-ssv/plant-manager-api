import { type LoadPlantsEnvironment } from '@/domain/usecases/load-plants-environment'

class DbLoadPlantsEnvironment implements LoadPlantsEnvironment {
  constructor(
    private readonly loadPlantsEnvironmentRepository: LoadPlantsEnvironmentRepository
  ) {}

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result> {
    await this.loadPlantsEnvironmentRepository.loadMany()
  }
}

interface LoadPlantsEnvironmentRepository {
  loadMany: (
    environment?: string
  ) => Promise<LoadPlantsEnvironmentRepository.Result>
}

namespace LoadPlantsEnvironmentRepository {
  export interface Result extends LoadPlantsEnvironment.Result {}
}

class LoadPlantsEnvironmentRepositoryMock
  implements LoadPlantsEnvironmentRepository
{
  callsCount = 0

  async loadMany(
    environment?: string
  ): Promise<LoadPlantsEnvironmentRepository.Result> {
    this.callsCount++
  }
}

describe('DbLoadPlantsEnvironment', () => {
  it('should call LoadPlantsEnvironmentRepository', async () => {
    const loadPlantsEnvironmentRepositoryMock =
      new LoadPlantsEnvironmentRepositoryMock()
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositoryMock)

    await sut.perform()

    expect(loadPlantsEnvironmentRepositoryMock.callsCount).toBe(1)
  })
})
