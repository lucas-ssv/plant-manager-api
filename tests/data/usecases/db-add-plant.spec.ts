import { mockAddPlantParams, mockPlantModel } from '@/tests/domain/mocks'

import { DbAddPlant } from '@/data/usecases'
import {
  AddPlantRepositoryMock,
  AddPlantWaterFrequencyRepositorySpy,
  FindPlantByNameRepositorySpy,
} from '@/tests/data/mocks'
import {
  type AddPlantEnvironmentRepository,
  type AddEnvironmentRepository,
} from '@/data/contracts'

import { faker } from '@faker-js/faker'
import { type AddPlantEnvironment } from '@/domain/usecases'

interface SutTypes {
  sut: DbAddPlant
  findPlantByNameRepositorySpy: FindPlantByNameRepositorySpy
  addPlantWaterFrequencyRepositorySpy: AddPlantWaterFrequencyRepositorySpy
  addPlantRepositoryMock: AddPlantRepositoryMock
  validateUuidMock: ValidateUuidMock
  addEnvironmentRepositorySpy: AddEnvironmentRepositorySpy
  addPlantEnvironmentRepositoryMock: AddPlantEnvironmentRepositoryMock
}

class AddEnvironmentRepositorySpy implements AddEnvironmentRepository {
  input?: AddEnvironmentRepository.Params
  callsCount = 0
  output = faker.string.uuid()

  async add(input: AddEnvironmentRepository.Params): Promise<string> {
    this.input = input
    this.callsCount++
    return this.output
  }
}

interface ValidateUuid {
  validate: (value: string) => boolean
}

class ValidateUuidMock implements ValidateUuid {
  input?: string
  output = false

  validate(value: string): boolean {
    this.input = value
    return this.output
  }
}

class AddPlantEnvironmentRepositoryMock
  implements AddPlantEnvironmentRepository
{
  input?: AddPlantEnvironment.Params

  async add(input: AddPlantEnvironmentRepository.Params): Promise<void> {
    this.input = input
  }
}

const makeSut = (): SutTypes => {
  const findPlantByNameRepositorySpy = new FindPlantByNameRepositorySpy()
  const addPlantWaterFrequencyRepositorySpy =
    new AddPlantWaterFrequencyRepositorySpy()
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const validateUuidMock = new ValidateUuidMock()
  const addEnvironmentRepositorySpy = new AddEnvironmentRepositorySpy()
  const addPlantEnvironmentRepositoryMock =
    new AddPlantEnvironmentRepositoryMock()
  const sut = new DbAddPlant(
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    validateUuidMock,
    addEnvironmentRepositorySpy,
    addPlantEnvironmentRepositoryMock
  )
  return {
    sut,
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    validateUuidMock,
    addEnvironmentRepositorySpy,
    addPlantEnvironmentRepositoryMock,
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
    const { sut, addPlantRepositoryMock, addPlantWaterFrequencyRepositorySpy } =
      makeSut()
    const id = faker.string.uuid()
    addPlantWaterFrequencyRepositorySpy.output = id
    const plant = mockAddPlantParams()
    const { plantWaterFrequency, environments, ...restPlant } = plant

    await sut.perform(plant)

    expect(addPlantRepositoryMock.input).toEqual({
      ...restPlant,
      plantWaterFrequencyId: id,
    })
  })

  it('should throw if AddPlantRepository.add() throws', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()
    jest.spyOn(addPlantRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call validateUuid with correct data', async () => {
    const { sut, validateUuidMock } = makeSut()
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(validateUuidMock.input).toBe(input.environments[1])
  })

  it('should call AddEnvironmentRepository if uuid is not provided', async () => {
    const { sut, addPlantRepositoryMock, addEnvironmentRepositorySpy } =
      makeSut()
    const plantId = faker.string.uuid()
    addPlantRepositoryMock.output = plantId
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
      addPlantRepositoryMock,
      addEnvironmentRepositorySpy,
    } = makeSut()

    await sut.perform(mockAddPlantParams())

    expect(addPlantEnvironmentRepositoryMock.input).toEqual({
      plantId: addPlantRepositoryMock.output,
      environmentId: addEnvironmentRepositorySpy.output,
    })
  })
})
