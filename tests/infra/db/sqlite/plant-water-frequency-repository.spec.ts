import { type PlantWaterFrequencyRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

import { faker } from '@faker-js/faker'

class SQLitePlantWaterFrequencyRepository
  implements PlantWaterFrequencyRepository
{
  async add(input: PlantWaterFrequencyRepository.Params): Promise<string> {
    const plantWaterFrequency = await prisma.plantWaterFrequency.create({
      data: input,
    })
    return plantWaterFrequency.id
  }
}

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
