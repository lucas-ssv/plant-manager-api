import { DbLoadPlantsEnvironment } from '@/data/usecases'
import { LoadPlantsEnvironmentRepositorySpy } from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'

describe('DbLoadPlantsEnvironment', () => {
  it('should call LoadPlantsEnvironmentRepository with correct environment', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)
    const environment = faker.lorem.word()

    await sut.perform(environment)

    expect(loadPlantsEnvironmentRepositorySpy.input).toBe(environment)
    expect(loadPlantsEnvironmentRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of environment with plants on success', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)

    const plantsEnvironmentList = await sut.perform()

    expect(plantsEnvironmentList).toEqual(
      loadPlantsEnvironmentRepositorySpy.output
    )
  })

  it('should throw if LoadPlantsEnvironmentRepository throws', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    jest
      .spyOn(loadPlantsEnvironmentRepositorySpy, 'loadMany')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)

    const promise = sut.perform()

    await expect(promise).rejects.toThrowError()
  })
})
