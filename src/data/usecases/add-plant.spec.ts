import { type Plant } from '@/domain/entities'

class DbAddPlant {
  constructor(private readonly addPlantRepository: AddPlantRepository) {}

  async perform(input: Plant): Promise<void> {
    await this.addPlantRepository.load(input)
  }
}

interface AddPlantRepository {
  load: (input: Plant) => Promise<void>
}

class AddPlantRepositoryMock implements AddPlantRepository {
  input?: Plant
  callsCount = 0

  async load(input: Plant): Promise<void> {
    this.input = input
    this.callsCount++
  }
}

describe('AddPlant UseCase', () => {
  it('should call AddPlantRepository with correct data', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    const sut = new DbAddPlant(addPlantRepositoryMock)
    const plant = {
      id: 'any_id',
      name: 'any_plant',
      description: 'any_plant_description',
      waterTips: 'any_water_tips',
      photo: 'any_photo',
    }

    await sut.perform(plant)

    expect(addPlantRepositoryMock.input).toEqual(plant)
  })

  it('should call AddPlantRepository only once', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    const sut = new DbAddPlant(addPlantRepositoryMock)

    await sut.perform({
      id: 'any_id',
      name: 'any_plant',
      description: 'any_plant_description',
      waterTips: 'any_water_tips',
      photo: 'any_photo',
    })

    expect(addPlantRepositoryMock.callsCount).toBe(1)
  })

  it('should throw if AddPlantRepository throws', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    jest.spyOn(addPlantRepositoryMock, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new DbAddPlant(addPlantRepositoryMock)

    const promise = sut.perform({
      id: 'any_id',
      name: 'any_plant',
      description: 'any_plant_description',
      waterTips: 'any_water_tips',
      photo: 'any_photo',
    })

    await expect(promise).rejects.toThrowError()
  })
})
