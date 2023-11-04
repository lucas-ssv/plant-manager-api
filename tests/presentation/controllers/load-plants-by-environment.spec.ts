import { ok, serverError } from '@/presentation/helpers'
import { LoadPlantsByEnvironmentSpy } from '@/tests/presentation/mocks'
import { LoadPlantsByEnvironmentController } from '@/presentation/controllers'
import { faker } from '@faker-js/faker'

interface SutOutput {
  sut: LoadPlantsByEnvironmentController
  loadPlantsByEnvironmentSpy: LoadPlantsByEnvironmentSpy
}

const makeSut = (): SutOutput => {
  const loadPlantsByEnvironmentSpy = new LoadPlantsByEnvironmentSpy()
  const sut = new LoadPlantsByEnvironmentController(loadPlantsByEnvironmentSpy)
  return {
    sut,
    loadPlantsByEnvironmentSpy,
  }
}

describe('LoadPlantsByEnvironmentController', () => {
  it('should call LoadPlantsByEnvironment with correct data', async () => {
    const { sut, loadPlantsByEnvironmentSpy } = makeSut()
    const fakeEnvironment = faker.lorem.word()

    await sut.handle({
      query: {
        q: fakeEnvironment,
      },
    })

    expect(loadPlantsByEnvironmentSpy.input).toBe(fakeEnvironment)
  })

  it('should return 200 if LoadPlantsByEnvironment returns a list of plants', async () => {
    const { sut, loadPlantsByEnvironmentSpy } = makeSut()

    const httpResponse = await sut.handle({
      query: {
        q: faker.lorem.word(),
      },
    })

    expect(httpResponse).toEqual(ok(loadPlantsByEnvironmentSpy.output))
  })

  it('should return 500 if LoadPlantsByEnvironment throws', async () => {
    const { sut, loadPlantsByEnvironmentSpy } = makeSut()
    jest
      .spyOn(loadPlantsByEnvironmentSpy, 'perform')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
