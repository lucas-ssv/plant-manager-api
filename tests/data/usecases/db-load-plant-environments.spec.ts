import { DbLoadPlantEnvironments } from '@/data/usecases'
import { LoadPlantEnvironmentsRepositorySpy } from '@/tests/data/mocks'

describe('DbLoadPlantEnvironments UseCase', () => {
  it('should call LoadPlantEnvironmentsRepository only once', async () => {
    const loadPlantEnvironmentsRepositorySpy =
      new LoadPlantEnvironmentsRepositorySpy()
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositorySpy)

    await sut.perform()

    expect(loadPlantEnvironmentsRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of plant environments on success', async () => {
    const loadPlantEnvironmentsRepositorySpy =
      new LoadPlantEnvironmentsRepositorySpy()
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositorySpy)

    const plantEnvironments = await sut.perform()

    expect(plantEnvironments).toEqual(loadPlantEnvironmentsRepositorySpy.output)
  })

  it('should throw if LoadPlantEnvironmentsRepository throws', async () => {
    const loadPlantEnvironmentsRepositorySpy =
      new LoadPlantEnvironmentsRepositorySpy()
    jest
      .spyOn(loadPlantEnvironmentsRepositorySpy, 'loadMany')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositorySpy)

    const promise = sut.perform()

    await expect(promise).rejects.toThrowError()
  })
})
