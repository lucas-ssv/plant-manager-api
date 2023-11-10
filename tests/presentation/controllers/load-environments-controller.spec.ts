import { LoadEnvironmentsController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { LoadEnvironmentsSpy } from '@/tests/presentation/mocks'

interface SutOutput {
  sut: LoadEnvironmentsController
  loadEnvironmentsSpy: LoadEnvironmentsSpy
}

const makeSut = (): SutOutput => {
  const loadEnvironmentsSpy = new LoadEnvironmentsSpy()
  const sut = new LoadEnvironmentsController(loadEnvironmentsSpy)
  return {
    sut,
    loadEnvironmentsSpy,
  }
}

describe('LoadEnvironmentsController', () => {
  it('should call LoadEnvironments', async () => {
    const { sut, loadEnvironmentsSpy } = makeSut()

    await sut.handle({})

    expect(loadEnvironmentsSpy.callsCount).toBe(1)
  })

  it('should return 200 if LoadEnvironments returns a list of environments', async () => {
    const { sut, loadEnvironmentsSpy } = makeSut()

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(loadEnvironmentsSpy.output))
  })

  it('should return 500 if LoadEnvironments throws', async () => {
    const { sut, loadEnvironmentsSpy } = makeSut()
    jest.spyOn(loadEnvironmentsSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
