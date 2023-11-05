import { prisma } from '@/infra/db'
import { SQLitePlantRepository } from '@/infra/db/sqlite'

import { faker } from '@faker-js/faker'

describe('SQLitePlantRepository', () => {
  beforeEach(async () => {
    await prisma.plantEnvironment.deleteMany()
    await prisma.environment.deleteMany()
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('findByName()', () => {
    it('should return a plant if plant with the same name exists', async () => {
      const sut = new SQLitePlantRepository()
      const plantName = faker.lorem.word()

      const plantWaterFrequency = await prisma.plantWaterFrequency.create({
        data: {
          description: faker.lorem.words(),
          time: faker.number.int(1),
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
  })

  describe('add()', () => {
    it('should add a plant on success', async () => {
      const sut = new SQLitePlantRepository()
      const plantWaterFrequencyId = faker.string.uuid()
      const fakePlantId = faker.string.uuid()
      jest.spyOn(sut, 'add').mockReturnValueOnce(Promise.resolve(fakePlantId))

      const { id } = await prisma.plantWaterFrequency.create({
        data: {
          id: plantWaterFrequencyId,
          description: faker.lorem.words(),
          time: faker.number.int({ max: 2 }),
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
  })
})
