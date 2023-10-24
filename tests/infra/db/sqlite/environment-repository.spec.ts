import { prisma } from '@/infra/db'
import { SQLiteEnvironmentRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLiteEnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.environment.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('add()', () => {
    it('should add an environment with the correct title', async () => {
      const sut = new SQLiteEnvironmentRepository()
      const title = faker.lorem.words()

      const plant = await prisma.plant.create({
        data: {
          name: faker.lorem.word(),
          description: faker.lorem.words(),
        },
      })
      await sut.add({
        title,
        plantId: plant.id,
      })
      const environment = await prisma.environment.findFirst({
        where: {
          title,
        },
      })

      expect(environment?.title).toBe(title)
    })
  })

  describe('loadManyByEnvironment', () => {
    it('should load plants by environment', async () => {
      const sut = new SQLiteEnvironmentRepository()
      const fakeEnvironment = faker.lorem.word()

      const plant = await prisma.plant.create({
        data: {
          name: faker.lorem.word(),
          description: faker.lorem.words(),
        },
      })
      await prisma.plant.create({
        data: {
          name: faker.lorem.word(),
          description: faker.lorem.words(),
        },
      })
      await prisma.environment.create({
        data: {
          title: fakeEnvironment,
          plantId: plant.id,
        },
      })
      const plants = await sut.loadManyByEnvironment(fakeEnvironment)

      expect(plants.length).toBe(1)
      expect(plants[0].title).toBe(fakeEnvironment)
    })
  })
})
