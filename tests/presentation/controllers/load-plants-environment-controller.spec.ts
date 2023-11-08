import { type LoadPlantsEnvironment } from '@/domain/usecases'
import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
} from '@/presentation/contracts'
import { ok } from '@/presentation/helpers'
import { plantsEnvironmentModel } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

class LoadPlantsEnvironmentController implements Controller {
  constructor(private readonly loadPlantsEnvironment: LoadPlantsEnvironment) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const plantsEnvironment = await this.loadPlantsEnvironment.perform(
      httpRequest.query?.q
    )
    return ok(plantsEnvironment)
  }
}

class LoadPlantsEnvironmentMock implements LoadPlantsEnvironment {
  input?: string
  output = plantsEnvironmentModel()

  async perform(environment?: string): Promise<LoadPlantsEnvironment.Result[]> {
    this.input = environment
    return this.output
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

  it('should return 200 if LoadPlantsEnvironment returns a list of plants environment', async () => {
    const loadPlantsEnvironmentMock = new LoadPlantsEnvironmentMock()
    const sut = new LoadPlantsEnvironmentController(loadPlantsEnvironmentMock)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(loadPlantsEnvironmentMock.output))
  })
})
