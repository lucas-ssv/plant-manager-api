import { type Plant } from '@/domain/entities'

class AddPlant {
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

  async load(input: Plant): Promise<void> {
    this.input = input
  }
}

describe('AddPlant UseCase', () => {
  it('should call AddPlantRepository with correct data', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    const sut = new AddPlant(addPlantRepositoryMock)
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

  it('should throw if AddPlantRepository throws', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    jest.spyOn(addPlantRepositoryMock, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddPlant(addPlantRepositoryMock)

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
