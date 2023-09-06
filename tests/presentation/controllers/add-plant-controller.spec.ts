import { type HttpRequest } from '@/presentation/contracts'
import { AddPlantController } from '@/presentation/controllers'
import { AddPlantSpy } from '@/tests/presentation/mocks'
import { noContent, serverError } from '@/presentation/helpers'

import { faker } from '@faker-js/faker'

const mockRequest = (): HttpRequest => ({
  body: {
    name: faker.lorem.words(),
    description: faker.lorem.words(),
    waterTips: faker.lorem.words(),
    photo: faker.internet.avatar(),
    plantWaterFrequencyId: faker.string.uuid(),
  },
})

class ValidationMock {
  input?: object

  validate(input: object): void {
    this.input = input
  }
}

describe('AddPlant Controller', () => {
  it('should call Validation with correct data', async () => {
    const validationMock = new ValidationMock()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationMock, addPlantSpy)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(validationMock.input).toEqual(httpRequest.body)
  })

  it('should call AddPlant with correct data', async () => {
    const validationMock = new ValidationMock()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationMock, addPlantSpy)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(addPlantSpy.input).toEqual(httpRequest.body)
  })

  it('should return 500 if AddPlant throws', async () => {
    const validationMock = new ValidationMock()
    const addPlantSpy = new AddPlantSpy()
    jest.spyOn(addPlantSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddPlantController(validationMock, addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError())
  })

  it('should return 204 if AddPlant succeeds', async () => {
    const validationMock = new ValidationMock()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationMock, addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
