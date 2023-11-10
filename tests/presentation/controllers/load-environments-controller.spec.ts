import { type Environment } from '@/domain/entities'
import { type LoadEnvironments } from '@/domain/usecases'
import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok } from '@/presentation/helpers'
import { faker } from '@faker-js/faker'

class LoadEnvironmentsController implements Controller {
  constructor(private readonly loadEnvironments: LoadEnvironments) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const environments = await this.loadEnvironments.perform()
    return ok(environments)
  }
}

const mockEnvironments = (): Environment[] => [
  {
    id: faker.string.uuid(),
    title: faker.word.words(),
  },
  {
    id: faker.string.uuid(),
    title: faker.word.words(),
  },
]

class LoadEnvironmentsMock implements LoadEnvironments {
  callsCount = 0
  output = mockEnvironments()

  async perform(): Promise<Environment[]> {
    this.callsCount++
    return this.output
  }
}

describe('LoadEnvironmentsController', () => {
  it('should call LoadEnvironments', async () => {
    const loadEnvironmentsMock = new LoadEnvironmentsMock()
    const sut = new LoadEnvironmentsController(loadEnvironmentsMock)

    await sut.handle({})

    expect(loadEnvironmentsMock.callsCount).toBe(1)
  })

  it('should return 200 if LoadEnvironments returns a list of environments', async () => {
    const loadEnvironmentsMock = new LoadEnvironmentsMock()
    const sut = new LoadEnvironmentsController(loadEnvironmentsMock)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(loadEnvironmentsMock.output))
  })
})
