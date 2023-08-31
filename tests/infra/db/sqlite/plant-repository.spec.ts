import { type PlantParams } from '@/domain/usecases'

import { prisma } from '@/infra/db/config'

import { faker } from '@faker-js/faker'

class PlantRepository {
  async add(input: PlantParams): Promise<void> {
    await prisma.plant.create({
      data: input,
    })
  }
}

describe('PlantRepository', () => {
  beforeEach(async () => {
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add a plant on success', async () => {
    const sut = new PlantRepository()

    await sut.add({
      name: faker.lorem.word(),
      description: faker.word.words(),
      waterTips: faker.word.words(),
      photo: faker.internet.avatar(),
    })
    const plants = await prisma.plant.findMany()

    expect(plants.length).toBe(1)
  })
})
