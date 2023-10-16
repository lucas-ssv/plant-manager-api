import { DbAddEnvironment } from '@/data/usecases'
import { AddEnvironmentRepositorySpy } from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbAddEnvironment
  addEnvironmentRepositorySpy: AddEnvironmentRepositorySpy
}

const makeSut = (): SutTypes => {
  const addEnvironmentRepositorySpy = new AddEnvironmentRepositorySpy()
  const sut = new DbAddEnvironment(addEnvironmentRepositorySpy)
  return {
    sut,
    addEnvironmentRepositorySpy,
  }
}

describe('DbAddEnvironment UseCase', () => {
  it('should call AddEnvironmentRepository with correct data', async () => {
    const { sut, addEnvironmentRepositorySpy } = makeSut()
    const title = faker.lorem.words()

    await sut.perform({
      title,
    })

    expect(addEnvironmentRepositorySpy.input).toEqual(title)
  })

  it('should return an environment id on success', async () => {
    const { sut, addEnvironmentRepositorySpy } = makeSut()
    addEnvironmentRepositorySpy.output = faker.string.uuid()

    const environmentId = await sut.perform({
      title: faker.lorem.words(),
    })

    expect(environmentId).toBe(addEnvironmentRepositorySpy.output)
  })

  it('should throw if AddEnvironmentRepository throws', async () => {
    const { sut, addEnvironmentRepositorySpy } = makeSut()
    jest
      .spyOn(addEnvironmentRepositorySpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform({
      title: faker.lorem.words(),
    })

    await expect(promise).rejects.toThrowError()
  })
})
