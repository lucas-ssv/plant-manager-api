import { mockAddPlantParams } from '@/tests/domain/mocks'

import { DbAddPlant } from '@/data/usecases'
import {
  AddPlantRepositoryMock,
  AddPlantWaterFrequencyRepositorySpy,
  FindPlantByNameRepositorySpy,
} from '@/tests/data/mocks'
import { type AddEnvironmentRepository } from '@/data/contracts'

import { faker } from '@faker-js/faker'

interface SutTypes {
  sut: DbAddPlant
  findPlantByNameRepositorySpy: FindPlantByNameRepositorySpy
  addPlantWaterFrequencyRepositorySpy: AddPlantWaterFrequencyRepositorySpy
  addPlantRepositoryMock: AddPlantRepositoryMock
  addEnvironmentRepositorySpy: AddEnvironmentRepositorySpy
}

class AddEnvironmentRepositorySpy implements AddEnvironmentRepository {
  input?: AddEnvironmentRepository.Params
  callsCount = 0

  async add(input: AddEnvironmentRepository.Params): Promise<void> {
    this.input = input
    this.callsCount++
  }
}

const makeSut = (): SutTypes => {
  const findPlantByNameRepositorySpy = new FindPlantByNameRepositorySpy()
  const addPlantWaterFrequencyRepositorySpy =
    new AddPlantWaterFrequencyRepositorySpy()
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const addEnvironmentRepositorySpy = new AddEnvironmentRepositorySpy()
  const sut = new DbAddPlant(
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    addEnvironmentRepositorySpy
  )
  return {
    sut,
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    addEnvironmentRepositorySpy,
  }
}

describe('DbAddPlant UseCase', () => {
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

  it('should call AddEnvironmentRepository with correct data', async () => {
    const { sut, addPlantRepositoryMock, addEnvironmentRepositorySpy } =
      makeSut()
    const plantId = faker.string.uuid()
    addPlantRepositoryMock.output = plantId
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(addEnvironmentRepositorySpy.input).toEqual({
      title: input.environments[1],
      plantId,
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
})
