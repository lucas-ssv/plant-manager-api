import { prisma } from '@/infra/db'
import { SQLitePlantWaterFrequencyRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLitePlantWaterFrequencyRepository', () => {
  beforeEach(async () => {
    await prisma.plantWaterFrequency.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add plant water frequency', async () => {
    const sut = new SQLitePlantWaterFrequencyRepository()
    const title = faker.lorem.words()

    const plantWaterFrequencyId = await sut.add({
      title,
      time: faker.lorem.word(),
      gap: faker.number.int({ max: 1 }),
    })
    const plantWaterFrequency = await prisma.plantWaterFrequency.findUnique({
      where: {
        id: plantWaterFrequencyId,
      },
    })

    expect(plantWaterFrequency?.id).toBe(plantWaterFrequencyId)
  })
})
