import { prisma } from '@/infra/db'
import { SQLiteEnvironmentRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLiteEnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.plantEnvironment.deleteMany()
    await prisma.environment.deleteMany()
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('add()', () => {
    it('should add an environment with the correct title', async () => {
      const sut = new SQLiteEnvironmentRepository()
      const title = faker.lorem.words()

      await sut.add({
        title,
      })
      const environment = await prisma.environment.findFirst({
        where: {
          title,
        },
      })

      expect(environment?.title).toBe(title)
    })
  })
})
