import { type LoadPlantsByEnvironment } from '@/domain/usecases'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers'
import { mockPlantsByEnvironment } from '@/tests/domain/mocks'
import { faker } from '@faker-js/faker'

class LoadPlantsByEnvironmentController implements Controller {
  constructor(
    private readonly loadPlantsByEnvironment: LoadPlantsByEnvironment
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const plants = await this.loadPlantsByEnvironment.perform(
        httpRequest.query?.q
      )
      return ok(plants)
    } catch (error) {
      return serverError(error)
    }
  }
}

class LoadPlantsByEnvironmentMock implements LoadPlantsByEnvironment {
  input?: string
  output = mockPlantsByEnvironment()

  async perform(
    environment?: string
  ): Promise<LoadPlantsByEnvironment.Result[]> {
    this.input = environment
    return this.output
  }
}

describe('LoadPlantsByEnvironmentController', () => {
  it('should call LoadPlantsByEnvironment with correct data', async () => {
    const loadPlantsByEnvironmentMock = new LoadPlantsByEnvironmentMock()
    const sut = new LoadPlantsByEnvironmentController(
      loadPlantsByEnvironmentMock
    )
    const fakeEnvironment = faker.lorem.word()

    await sut.handle({
      query: {
        q: fakeEnvironment,
      },
    })

    expect(loadPlantsByEnvironmentMock.input).toBe(fakeEnvironment)
  })

  it('should return 200 if LoadPlantsByEnvironment returns a list of plants', async () => {
    const loadPlantsByEnvironmentMock = new LoadPlantsByEnvironmentMock()
    const sut = new LoadPlantsByEnvironmentController(
      loadPlantsByEnvironmentMock
    )

    const httpResponse = await sut.handle({
      query: {
        q: faker.lorem.word(),
      },
    })

    expect(httpResponse).toEqual(ok(loadPlantsByEnvironmentMock.output))
  })

  it('should return 500 if LoadPlantsByEnvironment throws', async () => {
    const loadPlantsByEnvironmentMock = new LoadPlantsByEnvironmentMock()
    jest
      .spyOn(loadPlantsByEnvironmentMock, 'perform')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new LoadPlantsByEnvironmentController(
      loadPlantsByEnvironmentMock
    )

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
