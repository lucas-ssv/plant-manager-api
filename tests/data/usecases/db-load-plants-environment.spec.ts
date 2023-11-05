import { type LoadPlantsEnvironment } from '@/domain/usecases/load-plants-environment'
import { faker } from '@faker-js/faker'

class DbLoadPlantsEnvironment implements LoadPlantsEnvironment {
  constructor(
    private readonly loadPlantsEnvironmentRepository: LoadPlantsEnvironmentRepository
  ) {}

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result[]> {
    return await this.loadPlantsEnvironmentRepository.loadMany()
  }
}

interface LoadPlantsEnvironmentRepository {
  loadMany: (
    environment?: string
  ) => Promise<LoadPlantsEnvironmentRepository.Result[]>
}

namespace LoadPlantsEnvironmentRepository {
  export interface Result extends LoadPlantsEnvironment.Result {}
}

const plantsEnvironmentModel = (): LoadPlantsEnvironment.Result[] => [
  {
    environment: {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
    },
    plants: [
      {
        id: faker.string.uuid(),
        name: faker.word.words(),
        description: faker.lorem.words(),
        photo: faker.image.url(),
        waterTips: faker.lorem.words(),
        plantWaterFrequency: {
          id: faker.string.uuid(),
          description: faker.word.words(),
          gap: faker.number.int(1),
          time: faker.number.int(1),
          lastDateWatering: new Date(),
        },
      },
    ],
  },
]

class LoadPlantsEnvironmentRepositorySpy
  implements LoadPlantsEnvironmentRepository
{
  callsCount = 0
  output = plantsEnvironmentModel()

  async loadMany(
    environment?: string
  ): Promise<LoadPlantsEnvironmentRepository.Result[]> {
    this.callsCount++
    return this.output
  }
}

describe('DbLoadPlantsEnvironment', () => {
  it('should call LoadPlantsEnvironmentRepository', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)

    await sut.perform()

    expect(loadPlantsEnvironmentRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of environment with plants on success', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)

    const plantsEnvironmentList = await sut.perform()

    expect(plantsEnvironmentList).toEqual(
      loadPlantsEnvironmentRepositorySpy.output
    )
  })
})
