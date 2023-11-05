import { prisma } from '@/infra/db'
import { SQLitePlantWaterFrequencyRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLitePlantWaterFrequencyRepository', () => {
  beforeEach(async () => {
    await prisma.plantEnvironment.deleteMany()
    await prisma.environment.deleteMany()
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add plant water frequency', async () => {
    const sut = new SQLitePlantWaterFrequencyRepository()
    const description = faker.lorem.words()

    const plantWaterFrequencyId = await sut.add({
      description,
      time: faker.number.int(1),
      gap: faker.number.int({ max: 1 }),
      lastDateWatering: null,
    })
    const plantWaterFrequency = await prisma.plantWaterFrequency.findUnique({
      where: {
        id: plantWaterFrequencyId,
      },
    })

    expect(plantWaterFrequency?.id).toBe(plantWaterFrequencyId)
  })
})
