import { type LoadPlantsEnvironment } from '@/domain/usecases'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
} from '@/presentation/contracts'
import { faker } from '@faker-js/faker'

class LoadPlantsEnvironmentController implements Controller {
  constructor(private readonly loadPlantsEnvironment: LoadPlantsEnvironment) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadPlantsEnvironment.perform(httpRequest.query?.q)
  }
}

class LoadPlantsEnvironmentMock implements LoadPlantsEnvironment {
  input?: string

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result[]> {
    this.input = environment
  }
}

describe('LoadPlantsEnvironmentController', () => {
  it('should call LoadPlantsEnvironment with correct data', async () => {
    const loadPlantsEnvironmentMock = new LoadPlantsEnvironmentMock()
    const sut = new LoadPlantsEnvironmentController(loadPlantsEnvironmentMock)
    const httpRequest = {
      query: { q: faker.lorem.word() },
    }

    await sut.handle(httpRequest)

    expect(loadPlantsEnvironmentMock.input).toBe(httpRequest.query.q)
  })
})
