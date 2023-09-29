import { type AddEnvironmentRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

import { faker } from '@faker-js/faker'

class EnvironmentRepository implements AddEnvironmentRepository {
  async add(input: AddEnvironmentRepository.Params): Promise<string> {
    const environment = await prisma.environment.create({
      data: input,
    })
    return environment.id
  }
}

describe('EnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.environment.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add an environment with the correct title', async () => {
    const sut = new EnvironmentRepository()
    const title = faker.lorem.words()

    await sut.add({
      title,
    })
    const environment = await prisma.environment.findFirst({
      where: {
        title,
      },
    })

    expect(environment?.title).toBe(title)
  })

  it('should return an environment id on success', async () => {
    const sut = new EnvironmentRepository()
    const id = faker.string.uuid()
    jest.spyOn(sut, 'add').mockReturnValueOnce(Promise.resolve(id))

    const environmentId = await sut.add({
      title: faker.lorem.words(),
    })

    expect(environmentId).toBe(id)
  })
})
