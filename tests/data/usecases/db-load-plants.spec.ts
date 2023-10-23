import { DbLoadPlants } from '@/data/usecases'
import { LoadPlantsRepositorySpy } from '@/tests/data/mocks'
import { faker } from '@faker-js/faker'

describe('DbLoadPlants UseCase', () => {
  it('should call LoadPlantsRepository with correct data', async () => {
    const loadPlantsRepositorySpy = new LoadPlantsRepositorySpy()
    const sut = new DbLoadPlants(loadPlantsRepositorySpy)
    const environment = faker.lorem.word()

    await sut.perform(environment)

    expect(loadPlantsRepositorySpy.input).toBe(environment)
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
