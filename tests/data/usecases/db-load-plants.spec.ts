import { type Plant } from '@/domain/entities'
import { mockPlantModels } from '@/tests/domain/mocks'

class DbLoadPlants {
  constructor(private readonly loadPlantsRepository: LoadPlantsRepositorySpy) {}

  async perform(): Promise<Plant[]> {
    return await this.loadPlantsRepository.loadMany()
  }
}

class LoadPlantsRepositorySpy {
  callsCount = 0
  output = mockPlantModels()

  async loadMany(): Promise<Plant[]> {
    this.callsCount++
    return this.output
  }
}

describe('DbLoadPlants UseCase', () => {
  it('should call LoadPlantsRepository only once', async () => {
    const loadPlantsRepositorySpy = new LoadPlantsRepositorySpy()
    const sut = new DbLoadPlants(loadPlantsRepositorySpy)

    await sut.perform()

    expect(loadPlantsRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of plants on success', async () => {
    const loadPlantsRepositorySpy = new LoadPlantsRepositorySpy()
    const sut = new DbLoadPlants(loadPlantsRepositorySpy)

    const plants = await sut.perform()

    expect(plants).toEqual(loadPlantsRepositorySpy.output)
  })
})
