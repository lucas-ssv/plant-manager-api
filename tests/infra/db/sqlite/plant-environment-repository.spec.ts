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

  it('should load all with environment provided', async () => {
    const sut = new SQLitePlantEnvironmentRepository()
    const environmentTitle = faker.lorem.words()

    const plantWaterFrequency = await prisma.plantWaterFrequency.create({
      data: {
        description: faker.word.words(),
        gap: faker.number.int(1),
        time: faker.number.int(1),
      },
    })
    const plant = await prisma.plant.create({
      data: {
        name: faker.word.noun(),
        description: faker.word.words(),
        plantWaterFrequencyId: plantWaterFrequency.id,
      },
    })
    const environment = await prisma.environment.create({
      data: {
        title: environmentTitle,
      },
    })
    const environment2 = await prisma.environment.create({
      data: {
        title: faker.word.words(),
      },
    })
    await prisma.plantEnvironment.create({
      data: {
        plantId: plant.id,
        environmentId: environment.id,
      },
    })
    const plant2 = await prisma.plant.create({
      data: {
        name: faker.lorem.word(),
        description: faker.word.words(),
      },
    })
    await prisma.plantEnvironment.create({
      data: {
        plantId: plant2.id,
        environmentId: environment2.id,
      },
    })
    const result = await sut.loadMany(environmentTitle)

    expect(result[0].plants.length).toBe(1)
  })
})
