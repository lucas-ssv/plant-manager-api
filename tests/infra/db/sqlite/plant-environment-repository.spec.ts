import { type AddPlantEnvironmentRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

import { faker } from '@faker-js/faker'

class SQLitePlantEnvironmentRepository
  implements AddPlantEnvironmentRepository
{
  async add(input: AddPlantEnvironmentRepository.Params): Promise<boolean> {
    const plantEnvironment = await prisma.plantEnvironment.create({
      data: {
        plantId: input.plantId,
        environmentId: input.environmentId,
      },
    })
    return plantEnvironment !== null
  }
}

describe('SQLitePlantEnvironmentRepository', () => {
  beforeEach(async () => {
    await prisma.plantWaterFrequency.deleteMany()
    await prisma.plantEnvironment.deleteMany()
    await prisma.environment.deleteMany()
    await prisma.plant.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should add a correct plant id and environment id on success', async () => {
    const sut = new SQLitePlantEnvironmentRepository()

    const plant = await prisma.plant.create({
      data: {
        name: faker.lorem.words(),
        description: faker.lorem.words(),
      },
    })
    const environment = await prisma.environment.create({
      data: {
        title: faker.lorem.word(),
      },
    })
    const isValid = await sut.add({
      plantId: plant.id,
      environmentId: environment.id,
    })
    const plantEnvironment = await prisma.plantEnvironment.findFirst({
      where: {
        plantId: plant.id,
        environmentId: environment.id,
      },
    })

    expect(plantEnvironment).not.toBe(null)
    expect(isValid).toBe(true)
  })
})
