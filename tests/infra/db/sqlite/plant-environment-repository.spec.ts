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

  it('should load all plants on success', async () => {
    const sut = new SQLitePlantEnvironmentRepository()

    const plantWaterFrequency = await prisma.plantWaterFrequency.create({
      data: {
        title: faker.lorem.word(),
        time: faker.string.numeric(),
        gap: faker.number.int({ max: 1 }),
      },
    })
    const plant = await prisma.plant.create({
      data: {
        name: faker.lorem.words(),
        description: faker.lorem.words(),
        plantWaterFrequencyId: plantWaterFrequency.id,
      },
    })
    const environment = await prisma.environment.create({
      data: {
        title: faker.lorem.word(),
      },
    })
    await prisma.plantEnvironment.create({
      data: {
        plantId: plant.id,
        environmentId: environment.id,
      },
    })
    const plants = await sut.loadMany()

    expect(plants).toEqual([
      {
        id: plant.id,
        name: plant.name,
        description: plant.description,
        waterTips: plant.waterTips,
        photo: plant.photo,
        createdAt: plant.createdAt,
        updatedAt: plant.updatedAt,
        plantWaterFrequency: {
          id: plantWaterFrequency.id,
          title: plantWaterFrequency.title,
          time: plantWaterFrequency.time,
          gap: plantWaterFrequency.gap,
          createdAt: plantWaterFrequency.createdAt,
          updatedAt: plantWaterFrequency.updatedAt,
        },
        environments: [
          {
            id: environment.id,
            title: environment.title,
            createdAt: environment.createdAt,
            updatedAt: environment.updatedAt,
          },
        ],
      },
    ])
  })
})
