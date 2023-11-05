import { prisma } from '@/infra/db'
import { SQLitePlantEnvironmentRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('PlantEnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.plantEnvironment.deleteMany()
    await prisma.environment.deleteMany()
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add on success', async () => {
    const sut = new SQLitePlantEnvironmentRepository()

    const plant = await prisma.plant.create({
      data: {
        name: faker.lorem.word(),
        description: faker.lorem.words(),
      },
    })
    const environment = await prisma.environment.create({
      data: {
        title: faker.lorem.words(),
      },
    })
    await sut.add({
      plantId: plant.id,
      environmentId: environment.id,
    })
    const plantEnvironmentCount = await prisma.plantEnvironment.count()

    expect(plantEnvironmentCount).toBe(1)
  })
})
