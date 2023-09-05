import { type AddPlant, type PlantParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

interface HttpRequest {
  body?: any
}

interface HttpResponse {
  statusCode: number
  data?: any
}

class AddPlantController {
  constructor(private readonly addPlant: AddPlant) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.addPlant.perform(httpRequest.body)
      return null as any
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          error: {
            name: 'InternalServerError',
            message:
              'An internal server error occurred while processing the request.',
          },
        },
      }
    }
  }
}

class AddPlantSpy implements AddPlant {
  input?: PlantParams

  async perform(input: PlantParams): Promise<boolean> {
    this.input = input
    return false
  }
}

describe('AddPlant Controller', () => {
  it('should call AddPlant with correct data', async () => {
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(addPlantSpy)
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

    expect(addPlantSpy.input).toEqual(httpRequest.body)
  })

  it('should return 500 if AddPlant throws', async () => {
    const addPlantSpy = new AddPlantSpy()
    jest.spyOn(addPlantSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddPlantController(addPlantSpy)
    const httpRequest = {
      body: {
        name: faker.lorem.words(),
        description: faker.lorem.words(),
        waterTips: faker.lorem.words(),
        photo: faker.internet.avatar(),
        plantWaterFrequencyId: faker.string.uuid(),
      },
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: {
        error: {
          name: 'InternalServerError',
          message:
            'An internal server error occurred while processing the request.',
        },
      },
    })
  })
})
