import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

class DbAddPlantWaterFrequency {
  constructor(
    private readonly plantWaterFrequencyRepository: PlantWaterFrequencyRepositoryMock
  ) {}

  async perform(input: AddPlantWaterFrequencyParams): Promise<void> {
    await this.plantWaterFrequencyRepository.add(input)
  }
}

class PlantWaterFrequencyRepositoryMock {
  input?: AddPlantWaterFrequencyParams

  async add(input: AddPlantWaterFrequencyParams): Promise<void> {
    this.input = input
  }
}

const mockAddPlantWaterFrequencyParams = (): AddPlantWaterFrequencyParams => ({
  title: faker.lorem.words(),
  time: faker.string.alphanumeric(),
  gap: faker.number.int(),
})

describe('DbAddPlantWaterFrequency UseCase', () => {
  it('should call PlantWaterFrequencyRepository with correct data', async () => {
    const plantWaterFrequencyRepositoryMock =
      new PlantWaterFrequencyRepositoryMock()
    const sut = new DbAddPlantWaterFrequency(plantWaterFrequencyRepositoryMock)
    const input = mockAddPlantWaterFrequencyParams()

    await sut.perform(input)

    expect(plantWaterFrequencyRepositoryMock.input).toEqual(input)
  })
})
