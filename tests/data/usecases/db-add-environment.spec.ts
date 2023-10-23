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
    const input = {
      title: faker.lorem.words(),
      plantId: faker.string.uuid(),
    }

    await sut.perform(input)

    expect(addEnvironmentRepositorySpy.input).toEqual(input)
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
      plantId: faker.string.uuid(),
    })

    await expect(promise).rejects.toThrowError()
  })
})
