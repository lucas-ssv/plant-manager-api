import { prisma } from '@/infra/db'
import { SQLiteEnvironmentRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLiteEnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plant.deleteMany()
    await prisma.environment.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add an environment with the correct title', async () => {
    const sut = new SQLiteEnvironmentRepository()
    const title = faker.lorem.words()

    await sut.add(title)
    const environment = await prisma.environment.findFirst({
      where: {
        title,
      },
    })

    expect(environment?.title).toBe(title)
  })

  it('should return true on success', async () => {
    const sut = new SQLiteEnvironmentRepository()
    const id = faker.string.uuid()
    jest.spyOn(sut, 'add').mockReturnValueOnce(Promise.resolve(id))

    const environmentId = await sut.add(faker.lorem.words())

    expect(environmentId).toBe(id)
  })
})
