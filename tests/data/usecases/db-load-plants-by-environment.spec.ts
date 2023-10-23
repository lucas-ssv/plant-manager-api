import { DbLoadPlantsByEnvironment } from '@/data/usecases'
import { LoadPlantsByEnvironmentRepositorySpy } from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'

interface SutOutput {
  sut: DbLoadPlantsByEnvironment
  loadPlantsByEnvironmentRepositorySpy: LoadPlantsByEnvironmentRepositorySpy
}

const makeSut = (): SutOutput => {
  const loadPlantsByEnvironmentRepositorySpy =
    new LoadPlantsByEnvironmentRepositorySpy()
  const sut = new DbLoadPlantsByEnvironment(
    loadPlantsByEnvironmentRepositorySpy
  )
  return {
    sut,
    loadPlantsByEnvironmentRepositorySpy,
  }
}

describe('DbLoadPlantsByEnvironment', () => {
  it('should call LoadPlantsByEnvironmentRepository with correct data', async () => {
    const { sut, loadPlantsByEnvironmentRepositorySpy } = makeSut()
    const fakeEnvironment = faker.lorem.word()

    await sut.perform(fakeEnvironment)

    expect(loadPlantsByEnvironmentRepositorySpy.input).toBe(fakeEnvironment)
  })

  it('should return a list of plants by environment on success', async () => {
    const { sut, loadPlantsByEnvironmentRepositorySpy } = makeSut()

    const plants = await sut.perform(faker.lorem.word())

    expect(loadPlantsByEnvironmentRepositorySpy.output).toEqual(plants)
  })

  it('should throw if LoadPlantsByEnvironmentRepository throws', async () => {
    const { sut, loadPlantsByEnvironmentRepositorySpy } = makeSut()
    jest
      .spyOn(loadPlantsByEnvironmentRepositorySpy, 'loadManyByEnvironment')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(faker.lorem.word())

    await expect(promise).rejects.toThrowError()
  })
})
