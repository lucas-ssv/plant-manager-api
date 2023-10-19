import { type Plant } from '@/domain/entities'
import { type LoadPlants } from '@/domain/usecases'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'
import { faker } from '@faker-js/faker'

class LoadPlantsController implements Controller {
  constructor(private readonly loadPlants: LoadPlants) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    const plants = await this.loadPlants.perform()
    return {
      statusCode: 200,
      body: plants,
    }
  }
}

class DbLoadPlantsMock implements LoadPlants {
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
  it('should call DbLoadPlants', async () => {
    const loadPlantsMock = new DbLoadPlantsMock()
    const sut = new LoadPlantsController(loadPlantsMock)

    await sut.handle({})

    expect(loadPlantsMock.callsCount).toBe(1)
  })

  it('should return a list of plants on success', async () => {
    const loadPlantsMock = new DbLoadPlantsMock()
    const fakePlants = mockPlants()
    loadPlantsMock.output = fakePlants
    const sut = new LoadPlantsController(loadPlantsMock)

    const plants = await sut.handle({})

    expect(plants).toEqual({
      statusCode: 200,
      body: fakePlants,
    })
  })
})
