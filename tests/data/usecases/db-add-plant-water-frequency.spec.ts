import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

class DbAddPlantWaterFrequency {
  constructor(
    private readonly plantWaterFrequencyRepository: PlantWaterFrequencyRepositorySpy
  ) {}

  async perform(input: AddPlantWaterFrequencyParams): Promise<void> {
    await this.plantWaterFrequencyRepository.add(input)
  }
}

class PlantWaterFrequencyRepositorySpy {
  input?: AddPlantWaterFrequencyParams
  output = faker.string.alpha()

  async add(input: AddPlantWaterFrequencyParams): Promise<string> {
    this.input = input
    return this.output
  }
}

const mockAddPlantWaterFrequencyParams = (): AddPlantWaterFrequencyParams => ({
  title: faker.lorem.words(),
  time: faker.string.alphanumeric(),
  gap: faker.number.int(),
})

describe('DbAddPlantWaterFrequency UseCase', () => {
  it('should call PlantWaterFrequencyRepository with correct data', async () => {
    const plantWaterFrequencyRepositorySpy =
      new PlantWaterFrequencyRepositorySpy()
    const sut = new DbAddPlantWaterFrequency(plantWaterFrequencyRepositorySpy)
    const input = mockAddPlantWaterFrequencyParams()

    await sut.perform(input)

    expect(plantWaterFrequencyRepositorySpy.input).toEqual(input)
  })

  it('should throw if PlantWaterFrequencyRepository throws', async () => {
    const plantWaterFrequencyRepositorySpy =
      new PlantWaterFrequencyRepositorySpy()
    jest
      .spyOn(plantWaterFrequencyRepositorySpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbAddPlantWaterFrequency(plantWaterFrequencyRepositorySpy)

    const promise = sut.perform(mockAddPlantWaterFrequencyParams())

    await expect(promise).rejects.toThrowError()
  })
})
