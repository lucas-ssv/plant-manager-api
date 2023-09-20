import { prisma } from '@/infra/db'
import { SQLitePlantRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLitePlantRepository', () => {
  beforeEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.plantWaterFrequency.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should return true if plant with the same name exists', async () => {
    const sut = new SQLitePlantRepository()
    const plant = faker.lorem.word()

    await sut.add({
      name: plant,
      description: faker.word.words(),
      waterTips: faker.word.words(),
      photo: faker.internet.avatar(),
    })
    const isPlantExists = await sut.check(plant)

    expect(isPlantExists).toBe(true)
  })

  it('should return false if none plant with the same name exists', async () => {
    const sut = new SQLitePlantRepository()

    const isPlantExists = await sut.check(faker.lorem.word())

    expect(isPlantExists).toBe(false)
  })

  it('should add a plant on success', async () => {
    const sut = new SQLitePlantRepository()
    const plantWaterFrequencyId = faker.string.uuid()

    const { id } = await prisma.plantWaterFrequency.create({
      data: {
        id: plantWaterFrequencyId,
        title: faker.lorem.words(),
        time: faker.lorem.word(),
        gap: faker.number.int({ max: 2 }),
      },
    })
    await sut.add({
      name: faker.lorem.word(),
      description: faker.word.words(),
      waterTips: faker.word.words(),
      photo: faker.internet.avatar(),
      plantWaterFrequencyId,
    })
    const plants = await prisma.plant.findMany()

    expect(plants.length).toBe(1)
    expect(plantWaterFrequencyId).toBe(id)
  })
})
