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

interface SutTypes {
  sut: DbAddPlant
  findPlantByNameRepositorySpy: FindPlantByNameRepositorySpy
  addPlantWaterFrequencyRepositorySpy: AddPlantWaterFrequencyRepositorySpy
  addPlantRepositoryMock: AddPlantRepositoryMock
  addEnvironmentRepositorySpy: AddEnvironmentRepositorySpy
  addPlantEnvironmentRepositoryMock: AddPlantEnvironmentRepositoryMock
}

class AddEnvironmentRepositorySpy implements AddEnvironmentRepository {
  input?: string
  callsCount = 0
  output = faker.string.uuid()

  async add(input: string): Promise<string> {
    this.input = input
    this.callsCount++
    return this.output
  }
}

class AddPlantEnvironmentRepositoryMock
  implements AddPlantEnvironmentRepository
{
  input?: object
  output = true

  async add(input: AddPlantEnvironmentRepository.Params): Promise<boolean> {
    this.input = input
    return this.output
  }
}

const makeSut = (): SutTypes => {
  const findPlantByNameRepositorySpy = new FindPlantByNameRepositorySpy()
  const addPlantWaterFrequencyRepositorySpy =
    new AddPlantWaterFrequencyRepositorySpy()
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const addEnvironmentRepositorySpy = new AddEnvironmentRepositorySpy()
  const addPlantEnvironmentRepositoryMock =
    new AddPlantEnvironmentRepositoryMock()
  const sut = new DbAddPlant(
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    addEnvironmentRepositorySpy,
    addPlantEnvironmentRepositoryMock
  )
  return {
    sut,
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
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

  it('should throw if PlantRepository.findByName() throws', async () => {
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
      title: input.plantWaterFrequency?.title,
      time: input.plantWaterFrequency?.time,
      gap: input.plantWaterFrequency?.gap,
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
    const { plantWaterFrequency, ...restPlant } = plant

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

  it('should call AddEnvironmentRepository with correct data', async () => {
    const { sut, addPlantRepositoryMock, addEnvironmentRepositorySpy } =
      makeSut()
    const plantId = faker.string.uuid()
    addPlantRepositoryMock.output = plantId
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(addEnvironmentRepositorySpy.input).toEqual(input.environments[1])
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

  it('should call PlantEnvironmentRepository with correct data', async () => {
    const {
      sut,
      addPlantRepositoryMock,
      addEnvironmentRepositorySpy,
      addPlantEnvironmentRepositoryMock,
    } = makeSut()
    const plantId = faker.string.uuid()
    const environmentId = faker.string.uuid()
    addPlantRepositoryMock.output = plantId
    addEnvironmentRepositorySpy.output = environmentId

    await sut.perform(mockAddPlantParams())

    expect(addPlantEnvironmentRepositoryMock.input).toEqual({
      plantId,
      environmentId,
    })
  })

  // it('should return true on success', async () => {
  //   const { sut } = makeSut()

  //   const isPlantExists = await sut.perform(mockAddPlantParams())

  //   expect(isPlantExists).toBe(true)
  // })
})
