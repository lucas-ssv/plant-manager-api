import { LoadPlantsEnvironmentController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { LoadPlantsEnvironmentSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

interface SutOutput {
  sut: LoadPlantsEnvironmentController
  loadPlantsEnvironmentSpy: LoadPlantsEnvironmentSpy
}

const makeSut = (): SutOutput => {
  const loadPlantsEnvironmentSpy = new LoadPlantsEnvironmentSpy()
  const sut = new LoadPlantsEnvironmentController(loadPlantsEnvironmentSpy)
  return {
    sut,
    loadPlantsEnvironmentSpy,
  }
}

describe('LoadPlantsEnvironmentController', () => {
  it('should call LoadPlantsEnvironment with correct data', async () => {
    const { sut, loadPlantsEnvironmentSpy } = makeSut()
    const httpRequest = {
      query: { q: faker.lorem.word() },
    }

    await sut.handle(httpRequest)

    expect(loadPlantsEnvironmentSpy.input).toBe(httpRequest.query.q)
  })

  it('should return 500 if LoadPlantsEnvironment throws', async () => {
    const { sut, loadPlantsEnvironmentSpy } = makeSut()
    jest
      .spyOn(loadPlantsEnvironmentSpy, 'perform')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('should return 200 if LoadPlantsEnvironment returns a list of plants environment', async () => {
    const { sut, loadPlantsEnvironmentSpy } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(loadPlantsEnvironmentSpy.output))
  })
})
