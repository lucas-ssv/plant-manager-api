import { mockAddPlantParams, mockPlantModel } from '@/tests/domain/mocks'

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
  addEnvironmentRepositoryMock: AddEnvironmentRepositoryMock
}

class AddEnvironmentRepositoryMock implements AddEnvironmentRepository {
  input?: string[]

  async add(input: string[]): Promise<void> {
    this.input = input
  }
}

const makeSut = (): SutTypes => {
  const findPlantByNameRepositorySpy = new FindPlantByNameRepositorySpy()
  const addPlantWaterFrequencyRepositorySpy =
    new AddPlantWaterFrequencyRepositorySpy()
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const addEnvironmentRepositoryMock = new AddEnvironmentRepositoryMock()
  const sut = new DbAddPlant(
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    addEnvironmentRepositoryMock
  )
  return {
    sut,
    findPlantByNameRepositorySpy,
    addPlantWaterFrequencyRepositorySpy,
    addPlantRepositoryMock,
    addEnvironmentRepositoryMock,
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
    const { sut, addEnvironmentRepositoryMock } = makeSut()
    const input = mockAddPlantParams()

    await sut.perform(input)

    expect(addEnvironmentRepositoryMock.input).toEqual(input.environments)
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(true)
  })
})
