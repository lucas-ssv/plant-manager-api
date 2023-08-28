import { DbLoadEnvironments } from '@/data/usecases'
import { LoadEnvironmentsRepositorySpy } from '@/tests/data/mocks'

describe('DbLoadEnvironments UseCase', () => {
  it('should call LoadEnvironmentsRepository only once', async () => {
    const loadEnvironmentsRepositorySpy = new LoadEnvironmentsRepositorySpy()
    const sut = new DbLoadEnvironments(loadEnvironmentsRepositorySpy)

    await sut.perform()

    expect(loadEnvironmentsRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of environments on success', async () => {
    const loadEnvironmentsRepositorySpy = new LoadEnvironmentsRepositorySpy()
    const sut = new DbLoadEnvironments(loadEnvironmentsRepositorySpy)

    const plantEnvironments = await sut.perform()

    expect(plantEnvironments).toEqual(loadEnvironmentsRepositorySpy.output)
  })

  it('should throw if LoadEnvironmentsRepository throws', async () => {
    const loadEnvironmentsRepositorySpy = new LoadEnvironmentsRepositorySpy()
    jest
      .spyOn(loadEnvironmentsRepositorySpy, 'loadMany')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbLoadEnvironments(loadEnvironmentsRepositorySpy)

    const promise = sut.perform()

    await expect(promise).rejects.toThrowError()
  })
})
