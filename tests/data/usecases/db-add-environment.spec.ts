import {
  type AddEnvironment,
  type AddEnvironmentParams,
} from '@/domain/usecases'

import { faker } from '@faker-js/faker'

class DbAddEnvironment implements AddEnvironment {
  constructor(
    private readonly addEnvironmentRepository: AddEnvironmentRepositoryMock
  ) {}

  async perform(input: AddEnvironmentParams): Promise<string> {
    return await this.addEnvironmentRepository.add(input)
  }
}

class AddEnvironmentRepositoryMock {
  input?: AddEnvironmentParams
  output = faker.string.uuid()

  async add(input: AddEnvironmentParams): Promise<string> {
    this.input = input
    return this.output
  }
}

describe('DbAddEnvironment UseCase', () => {
  it('should call AddEnvironmentRepository with correct data', async () => {
    const addEnvironmentRepositoryMock = new AddEnvironmentRepositoryMock()
    const sut = new DbAddEnvironment(addEnvironmentRepositoryMock)
    const title = faker.lorem.words()

    await sut.perform({
      title,
    })

    expect(addEnvironmentRepositoryMock.input).toEqual({
      title,
    })
  })

  it('should return an environment id on success', async () => {
    const addEnvironmentRepositoryMock = new AddEnvironmentRepositoryMock()
    addEnvironmentRepositoryMock.output = faker.string.uuid()
    const sut = new DbAddEnvironment(addEnvironmentRepositoryMock)

    const environmentId = await sut.perform({
      title: faker.lorem.words(),
    })

    expect(environmentId).toBe(addEnvironmentRepositoryMock.output)
  })
})
