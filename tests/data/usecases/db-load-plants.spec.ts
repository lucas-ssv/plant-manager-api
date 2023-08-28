import { DbLoadPlants } from '@/data/usecases'
import { LoadPlantsRepositorySpy } from '@/tests/data/mocks'

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

  it('should throw if LoadPlantsRepository throws', async () => {
    const loadPlantsRepositorySpy = new LoadPlantsRepositorySpy()
    jest
      .spyOn(loadPlantsRepositorySpy, 'loadMany')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbLoadPlants(loadPlantsRepositorySpy)

    const promise = sut.perform()

    await expect(promise).rejects.toThrowError()
  })
})
