import { prisma } from '@/infra/db'
import { PlantRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('PlantRepository', () => {
  beforeEach(async () => {
    await prisma.plant.deleteMany()
    await prisma.plantWaterFrequency.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add a plant on success', async () => {
    const sut = new PlantRepository()
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
