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
    await this.addEnvironmentRepository.add(input)
    return ''
  }
}

class AddEnvironmentRepositoryMock {
  input?: AddEnvironmentParams

  async add(input: AddEnvironmentParams): Promise<string> {
    this.input = input
    return ''
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
})
