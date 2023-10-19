import { type Plant } from '@/domain/entities'
import { type LoadPlants } from '@/domain/usecases'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'
import { serverError } from '@/presentation/helpers'
import { faker } from '@faker-js/faker'

class LoadPlantsController implements Controller {
  constructor(private readonly loadPlants: LoadPlants) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const plants = await this.loadPlants.perform()
      return {
        statusCode: 200,
        body: plants,
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

class DbLoadPlantsSpy implements LoadPlants {
  callsCount = 0
  output = mockPlants()

  async perform(): Promise<Plant[]> {
    this.callsCount++
    return this.output
  }
}

const mockPlants = (): Plant[] => [
  {
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.words(),
    waterTips: faker.lorem.words(),
    photo: faker.internet.avatar(),
    plantWaterFrequency: {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      time: faker.string.numeric(),
      gap: faker.number.int(),
    },
    environments: [
      {
        id: faker.string.uuid(),
        title: faker.lorem.word(),
      },
    ],
  },
]

describe('LoadPlantsController', () => {
  it('should call LoadPlants', async () => {
    const loadPlantsSpy = new DbLoadPlantsSpy()
    const sut = new LoadPlantsController(loadPlantsSpy)

    await sut.handle({})

    expect(loadPlantsSpy.callsCount).toBe(1)
  })

  it('should return 200 if LoadPlants return a list of plants', async () => {
    const loadPlantsSpy = new DbLoadPlantsSpy()
    const fakePlants = mockPlants()
    loadPlantsSpy.output = fakePlants
    const sut = new LoadPlantsController(loadPlantsSpy)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: fakePlants,
    })
  })

  it('should return 500 if LoadPlants throws', async () => {
    const loadPlantsSpy = new DbLoadPlantsSpy()
    jest.spyOn(loadPlantsSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new LoadPlantsController(loadPlantsSpy)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
