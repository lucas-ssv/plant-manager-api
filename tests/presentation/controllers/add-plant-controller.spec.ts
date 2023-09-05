import { type AddPlant, type PlantParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

interface HttpRequest {
  body?: any
}

class AddPlantController {
  constructor(private readonly addPlant: AddPlant) {}

  async handle(httpRequest: HttpRequest): Promise<void> {
    await this.addPlant.perform(httpRequest.body)
  }
}

class AddPlantMock implements AddPlant {
  input?: PlantParams

  async perform(input: PlantParams): Promise<boolean> {
    this.input = input
    return false
  }
}

describe('AddPlant Controller', () => {
  it('should call AddPlant with correct data', async () => {
    const addPlantMock = new AddPlantMock()
    const sut = new AddPlantController(addPlantMock)
    const httpRequest = {
      body: {
        name: faker.lorem.words(),
        description: faker.lorem.words(),
        waterTips: faker.lorem.words(),
        photo: faker.internet.avatar(),
        plantWaterFrequencyId: faker.string.uuid(),
      },
    }

    await sut.handle(httpRequest)

    expect(addPlantMock.input).toEqual(httpRequest.body)
  })
})
