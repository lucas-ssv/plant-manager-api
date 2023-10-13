import { prisma } from '@/infra/db'
import { SQLitePlantEnvironmentRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLitePlantEnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plantEnvironment.deleteMany()
    await prisma.environment.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add a correct plant id and environment id on success', async () => {
    const sut = new SQLitePlantEnvironmentRepository()

    const plant = await prisma.plant.create({
      data: {
        name: faker.lorem.words(),
        description: faker.lorem.words(),
      },
    })
    const environment = await prisma.environment.create({
      data: {
        title: faker.lorem.word(),
      },
    })
    const isValid = await sut.add({
      plantId: plant.id,
      environmentId: environment.id,
    })
    const plantEnvironment = await prisma.plantEnvironment.findFirst({
      where: {
        plantId: plant.id,
        environmentId: environment.id,
      },
    })

    expect(plantEnvironment).not.toBe(null)
    expect(isValid).toBe(true)
  })
})
