class DbLoadPlants {
  constructor(
    private readonly loadPlantsRepository: LoadPlantsRepositoryMock
  ) {}

  async perform(): Promise<void> {
    await this.loadPlantsRepository.loadMany()
  }
}

class LoadPlantsRepositoryMock {
  callsCount = 0

  async loadMany(): Promise<void> {
    this.callsCount++
  }
}

describe('DbLoadPlants UseCase', () => {
  it('should call LoadPlantsRepository only once', async () => {
    const loadPlantsRepositoryMock = new LoadPlantsRepositoryMock()
    const sut = new DbLoadPlants(loadPlantsRepositoryMock)

    await sut.perform()

    expect(loadPlantsRepositoryMock.callsCount).toBe(1)
  })
})
