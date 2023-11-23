import {
  mockAddPlantParams,
  mockEnvironment,
  mockPlantModel,
} from '@/tests/domain/mocks'

import { DbAddPlant } from '@/data/usecases'
import {
  AddEnvironmentRepositorySpy,
  AddPlantEnvironmentRepositoryMock,
  AddPlantRepositorySpy,
  AddPlantWaterFrequencyRepositorySpy,
  FindPlantByNameRepositorySpy,
  ValidateUuidSpy,
} from '@/tests/data/mocks'

import { faker } from '@faker-js/faker'
import { type FindEnvironmentByIdRepository } from '@/data/contracts'

interface SutTypes {
  sut: DbAddPlant
  findPlantByNameRepositorySpy: FindPlantByNameRepositorySpy
  addPlantWaterFrequencyRepositorySpy: AddPlantWaterFrequencyRepositorySpy
  addPlantRepositorySpy: AddPlantRepositorySpy
  validateUuidSpy: ValidateUuidSpy
  addEnvironmentRepositorySpy: AddEnvironmentRepositorySpy
  addPlantEnvironmentRepositoryMock: AddPlantEnvironmentRepositoryMock
  findEnvironmentByIdSpy: FindEnvironmentByIdSpy
}

class FindEnvironmentByIdSpy implements FindEnvironmentByIdRepository {
  input?: string
  output = mockEnvironment()

  async perform(id: string): Promise<FindEnvironmentByIdRepository.Result> {
    this.input = id
    return this.output
  }
}

const makeSut = (): SutTypes => {
  const findPlantByNameRepositorySpy = new FindPlantByNameRepositorySpy()
  const addPlantWaterFrequencyRepositorySpy =
    new AddPlantWaterFrequencyRepositorySpy()
  const addPlantRepositorySpy = new AddPlantRepositorySpy()
  const validateUuidSpy = new ValidateUuidSpy()
  const addEnvironmentRepositorySpy = new AddEnvironmentRepositorySpy()
  const addPlantEnvironmentRepositoryMock =
    new AddPlantEnvironmentRepositoryMock()
  const findEnvironmentByIdSpy = new FindEnvironmentByIdSpy()
  const sut = new DbAddPlant(
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositorySpy,
    validateUuidSpy,
    addEnvironmentRepositorySpy,
    addPlantEnvironmentRepositoryMock,
    findEnvironmentByIdSpy
  )
  return {
    sut,
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositorySpy,
    validateUuidSpy,
    addEnvironmentRepositorySpy,
    addPlantEnvironmentRepositoryMock,
    findEnvironmentByIdSpy,
  }
}

describe('DbAddPlant UseCase', () => {
  it('should return false if FindPlantByNameRepository.findByName() returns a plant', async () => {
    const { sut, findPlantByNameRepositorySpy } = makeSut()
    findPlantByNameRepositorySpy.output = mockPlantModel()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(false)
  })

  it('should throw if FindPlantByNameRepository.findByName() throws', async () => {
    const { sut, findPlantByNameRepositorySpy } = makeSut()
    jest
      .spyOn(findPlantByNameRepositorySpy, 'findByName')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call AddPlantWaterFrequencyRepository with correct data', async () => {
    const { sut, addPlantWaterFrequencyRepositorySpy } = makeSut()
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(addPlantWaterFrequencyRepositorySpy.input).toEqual({
      description: input.plantWaterFrequency?.description,
      time: input.plantWaterFrequency?.time,
      gap: input.plantWaterFrequency?.gap,
      lastDateWatering: input.plantWaterFrequency?.lastDateWatering,
    })
  })

  it('should throw if AddPlantWaterFrequencyRepository throws', async () => {
    const { sut, addPlantWaterFrequencyRepositorySpy } = makeSut()
    jest
      .spyOn(addPlantWaterFrequencyRepositorySpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call AddPlantRepository.add() with correct data', async () => {
    const { sut, addPlantRepositorySpy, addPlantWaterFrequencyRepositorySpy } =
      makeSut()
    const id = faker.string.uuid()
    addPlantWaterFrequencyRepositorySpy.output = id
    const plant = mockAddPlantParams()
    const { plantWaterFrequency, environments, ...restPlant } = plant

    await sut.perform(plant)

    expect(addPlantRepositorySpy.input).toEqual({
      ...restPlant,
      plantWaterFrequencyId: id,
    })
  })

  it('should throw if AddPlantRepository.add() throws', async () => {
    const { sut, addPlantRepositorySpy } = makeSut()
    jest.spyOn(addPlantRepositorySpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call validateUuid with correct data', async () => {
    const { sut, validateUuidSpy } = makeSut()
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(validateUuidSpy.input).toBe(input.environments[1])
  })

  it('should call AddEnvironmentRepository if uuid is not provided', async () => {
    const { sut, addPlantRepositorySpy, addEnvironmentRepositorySpy } =
      makeSut()
    const plantId = faker.string.uuid()
    addPlantRepositorySpy.output = plantId
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(addEnvironmentRepositorySpy.input).toEqual({
      title: input.environments[1],
    })
    expect(addEnvironmentRepositorySpy.callsCount).toBe(2)
  })

  it('should throw if AddEnvironmentRepository throws', async () => {
    const { sut, addEnvironmentRepositorySpy } = makeSut()
    jest
      .spyOn(addEnvironmentRepositorySpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call AddPlantEnvironmentRepository with correct data', async () => {
    const {
      sut,
      addPlantEnvironmentRepositoryMock,
      addPlantRepositorySpy,
      addEnvironmentRepositorySpy,
    } = makeSut()

    await sut.perform(mockAddPlantParams())

    expect(addPlantEnvironmentRepositoryMock.input).toEqual({
      plantId: addPlantRepositorySpy.output,
      environmentId: addEnvironmentRepositorySpy.output,
    })
  })

  it('should throw if AddPlantEnvironmentRepository throws', async () => {
    const { sut, addPlantEnvironmentRepositoryMock } = makeSut()
    jest
      .spyOn(addPlantEnvironmentRepositoryMock, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call FindEnvironmentById with correct data', async () => {
    const { sut, findEnvironmentByIdSpy, validateUuidSpy } = makeSut()
    validateUuidSpy.output = true
    const environmentId = faker.string.uuid()

    await sut.perform({
      name: faker.word.words(),
      description: faker.lorem.words(),
      photo: faker.internet.url(),
      waterTips: faker.word.words(),
      plantWaterFrequency: {
        description: faker.word.words(),
        gap: faker.number.int(1),
        time: faker.number.int(1),
        lastDateWatering: new Date(),
      },
      environments: [environmentId],
    })

    expect(findEnvironmentByIdSpy.input).toBe(environmentId)
  })

  it('should throw if FindEnvironmentById throws', async () => {
    const { sut, findEnvironmentByIdSpy, validateUuidSpy } = makeSut()
    validateUuidSpy.output = true
    jest.spyOn(findEnvironmentByIdSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform({
      name: faker.word.words(),
      description: faker.lorem.words(),
      photo: faker.internet.url(),
      waterTips: faker.word.words(),
      plantWaterFrequency: {
        description: faker.word.words(),
        gap: faker.number.int(1),
        time: faker.number.int(1),
        lastDateWatering: new Date(),
      },
      environments: [faker.string.uuid()],
    })

    await expect(promise).rejects.toThrowError()
  })
})
