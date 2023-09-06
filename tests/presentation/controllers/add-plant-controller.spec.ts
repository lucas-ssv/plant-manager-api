import { type HttpRequest } from '@/presentation/contracts'
import { AddPlantController } from '@/presentation/controllers'
import { AddPlantSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

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

describe('AddPlant Controller', () => {
  it('should call Validation with correct data', async () => {
    const validationSpy = new ValidationSpy()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationSpy, addPlantSpy)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(validationSpy.input).toEqual(httpRequest.body)
  })

  it('should return 400 if any validations fails', async () => {
    const validationSpy = new ValidationSpy()
    validationSpy.output = new Error()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationSpy, addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(badRequest())
  })

  it('should call AddPlant with correct data', async () => {
    const validationSpy = new ValidationSpy()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationSpy, addPlantSpy)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(addPlantSpy.input).toEqual(httpRequest.body)
  })

  it('should return 500 if AddPlant throws', async () => {
    const validationSpy = new ValidationSpy()
    const addPlantSpy = new AddPlantSpy()
    jest.spyOn(addPlantSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddPlantController(validationSpy, addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError())
  })

  it('should return 204 if AddPlant succeeds', async () => {
    const validationSpy = new ValidationSpy()
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(validationSpy, addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
