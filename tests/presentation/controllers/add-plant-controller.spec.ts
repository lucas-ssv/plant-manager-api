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

describe('AddPlant Controller', () => {
  it('should call AddPlant with correct data', async () => {
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(addPlantSpy)
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(addPlantSpy.input).toEqual(httpRequest.body)
  })

  it('should return 500 if AddPlant throws', async () => {
    const addPlantSpy = new AddPlantSpy()
    jest.spyOn(addPlantSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new AddPlantController(addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(serverError())
  })

  it('should return 204 if AddPlant succeeds', async () => {
    const addPlantSpy = new AddPlantSpy()
    const sut = new AddPlantController(addPlantSpy)

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(noContent())
  })
})
