import { type LoadPlantsEnvironment } from '@/domain/usecases/load-plants-environment'
import { faker } from '@faker-js/faker'

class DbLoadPlantsEnvironment implements LoadPlantsEnvironment {
  constructor(
    private readonly loadPlantsEnvironmentRepository: LoadPlantsEnvironmentRepository
  ) {}

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result[]> {
    return await this.loadPlantsEnvironmentRepository.loadMany(environment)
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
  input?: string
  callsCount = 0
  output = plantsEnvironmentModel()

  async loadMany(
    environment?: string
  ): Promise<LoadPlantsEnvironmentRepository.Result[]> {
    this.input = environment
    this.callsCount++
    return this.output
  }
}

describe('DbLoadPlantsEnvironment', () => {
  it('should call LoadPlantsEnvironmentRepository with correct environment', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)
    const environment = faker.lorem.word()

    await sut.perform(environment)

    expect(loadPlantsEnvironmentRepositorySpy.input).toBe(environment)
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

  it('should throw if LoadPlantsEnvironmentRepository throws', async () => {
    const loadPlantsEnvironmentRepositorySpy =
      new LoadPlantsEnvironmentRepositorySpy()
    jest
      .spyOn(loadPlantsEnvironmentRepositorySpy, 'loadMany')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbLoadPlantsEnvironment(loadPlantsEnvironmentRepositorySpy)

    const promise = sut.perform()

    await expect(promise).rejects.toThrowError()
  })
})
