import { type Environment } from '@/domain/entities'
import { type LoadEnvironments } from '@/domain/usecases'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'

class LoadEnvironmentsController implements Controller {
  constructor(private readonly loadEnvironments: LoadEnvironments) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadEnvironments.perform()
  }
}

class LoadEnvironmentsMock implements LoadEnvironments {
  callsCount = 0

  async perform(): Promise<Environment[]> {
    this.callsCount++
  }
}

describe('LoadEnvironmentsController', () => {
  it('should call LoadEnvironments', async () => {
    const loadEnvironmentsMock = new LoadEnvironmentsMock()
    const sut = new LoadEnvironmentsController(loadEnvironmentsMock)

    await sut.handle({})

    expect(loadEnvironmentsMock.callsCount).toBe(1)
  })
})
