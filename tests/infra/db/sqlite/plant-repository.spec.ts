import { prisma } from '@/infra/db'
import { SQLitePlantRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLitePlantRepository', () => {
  beforeEach(async () => {
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plant.deleteMany()
    await prisma.environment.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should return a plant if plant with the same name exists', async () => {
    const sut = new SQLitePlantRepository()
    const plantName = faker.lorem.word()

    const plantWaterFrequency = await prisma.plantWaterFrequency.create({
      data: {
        title: faker.lorem.words(),
        time: faker.string.numeric(),
        gap: faker.number.int(1),
      },
    })
    await sut.add({
      name: plantName,
      description: faker.word.words(),
      waterTips: faker.word.words(),
      photo: faker.internet.avatar(),
      plantWaterFrequencyId: plantWaterFrequency.id,
    })
    const plant = await sut.findByName(plantName)

    expect(plant).not.toBe(null)
  })

  it('should return null if none plant with the same name exists', async () => {
    const sut = new SQLitePlantRepository()

    const plant = await sut.findByName(faker.lorem.word())

    expect(plant).toBe(null)
  })

  it('should add a plant on success', async () => {
    const sut = new SQLitePlantRepository()
    const plantWaterFrequencyId = faker.string.uuid()
    const fakePlantId = faker.string.uuid()
    jest.spyOn(sut, 'add').mockReturnValueOnce(Promise.resolve(fakePlantId))

    const { id } = await prisma.plantWaterFrequency.create({
      data: {
        id: plantWaterFrequencyId,
        title: faker.lorem.words(),
        time: faker.lorem.word(),
        gap: faker.number.int({ max: 2 }),
      },
    })
    const plantId = await sut.add({
      name: faker.lorem.word(),
      description: faker.word.words(),
      waterTips: faker.word.words(),
      photo: faker.internet.avatar(),
      plantWaterFrequencyId,
    })

    expect(plantId).toBe(fakePlantId)
    expect(plantWaterFrequencyId).toBe(id)
  })

  it('should load all plants on success', async () => {
    const sut = new SQLitePlantRepository()

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
        plantId: plant.id,
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
