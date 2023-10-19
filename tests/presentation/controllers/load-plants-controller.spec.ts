import { type Plant } from '@/domain/entities'
import { type LoadPlants } from '@/domain/usecases'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'

class LoadPlantsController implements Controller {
  constructor(private readonly loadPlants: LoadPlants) {}

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadPlants.perform()
  }
}

class DbLoadPlantsMock implements LoadPlants {
  callsCount = 0

  async perform(): Promise<Plant[]> {
    this.callsCount++
  }
}

describe('LoadPlantsController', () => {
  it('should call DbLoadPlants', async () => {
    const loadPlantsMock = new DbLoadPlantsMock()
    const sut = new LoadPlantsController(loadPlantsMock)

    await sut.handle({})

    expect(loadPlantsMock.callsCount).toBe(1)
  })
})
