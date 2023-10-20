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

    const plant = await prisma.plant.create({
      data: {
        name: faker.lorem.word(),
        description: faker.lorem.words(),
      },
    })
    await sut.add({
      title,
      plantId: plant.id,
    })
    const environment = await prisma.environment.findFirst({
      where: {
        title,
      },
    })

    expect(environment?.title).toBe(title)
  })
})
