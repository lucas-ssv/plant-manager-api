import { type PlantEnvironment } from '@/domain/entities/plant-environment'
import { type LoadPlantEnvironments } from '@/domain/usecases/load-plant-environments'

class DbLoadPlantEnvironments implements LoadPlantEnvironments {
  constructor(
    private readonly loadPlantEnvironmentsRepository: LoadPlantEnvironmentsRepository
  ) {}

  async perform(): Promise<PlantEnvironment[]> {
    return await this.loadPlantEnvironmentsRepository.loadMany()
  }
}

interface LoadPlantEnvironmentsRepository {
  loadMany: () => Promise<PlantEnvironment[]>
}

class LoadPlantEnvironmentsRepositorySpy
  implements LoadPlantEnvironmentsRepository
{
  callsCount = 0
  output = mockPlantEnvironments()

  async loadMany(): Promise<PlantEnvironment[]> {
    this.callsCount++
    return this.output
  }
}

const mockPlantEnvironments = (): PlantEnvironment[] => [
  {
    key: 'any_key',
    title: 'any_title',
  },
]

describe('DbLoadPlantEnvironments UseCase', () => {
  it('should call LoadPlantEnvironmentsRepository only once', async () => {
    const loadPlantEnvironmentsRepositorySpy =
      new LoadPlantEnvironmentsRepositorySpy()
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositorySpy)

    await sut.perform()

    expect(loadPlantEnvironmentsRepositorySpy.callsCount).toBe(1)
  })

  it('should return a list of plant environments on success', async () => {
    const loadPlantEnvironmentsRepositorySpy =
      new LoadPlantEnvironmentsRepositorySpy()
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositorySpy)

    const plantEnvironments = await sut.perform()

    expect(plantEnvironments).toEqual(loadPlantEnvironmentsRepositorySpy.output)
  })

  it('should throw if LoadPlantEnvironmentsRepository throws', async () => {
    const loadPlantEnvironmentsRepositorySpy =
      new LoadPlantEnvironmentsRepositorySpy()
    jest
      .spyOn(loadPlantEnvironmentsRepositorySpy, 'loadMany')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbLoadPlantEnvironments(loadPlantEnvironmentsRepositorySpy)

    const promise = sut.perform()

    await expect(promise).rejects.toThrowError()
  })
})
