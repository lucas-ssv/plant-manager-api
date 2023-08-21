import { DbAddPlant } from '@/data/usecases'

import { mockAddPlantParams } from '@/tests/domain/mocks'
import {
  AddPlantRepositoryMock,
  CheckPlantExistsRepositorySpy,
} from '@/tests/data/mocks'

interface SutTypes {
  sut: DbAddPlant
  addPlantRepositoryMock: AddPlantRepositoryMock
  checkPlantExistsRepositorySpy: CheckPlantExistsRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const checkPlantExistsRepositorySpy = new CheckPlantExistsRepositorySpy()
  const sut = new DbAddPlant(
    addPlantRepositoryMock,
    checkPlantExistsRepositorySpy
  )
  return {
    sut,
    addPlantRepositoryMock,
    checkPlantExistsRepositorySpy,
  }
}

describe('AddPlant UseCase', () => {
  it('should call AddPlantRepository with correct data', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()
    const plant = mockAddPlantParams()

    await sut.perform(plant)

    expect(addPlantRepositoryMock.input).toEqual(plant)
  })

  it('should call AddPlantRepository only once', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()

    await sut.perform(mockAddPlantParams())

    expect(addPlantRepositoryMock.callsCount).toBe(1)
  })

  it('should throw if AddPlantRepository throws', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()
    jest.spyOn(addPlantRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call CheckPlantExistsRepository with correct id', async () => {
    const { sut, checkPlantExistsRepositorySpy } = makeSut()
    const plant = mockAddPlantParams()

    await sut.perform(plant)

    expect(checkPlantExistsRepositorySpy.name).toBe(plant.name)
  })

  it('should return true if CheckPlantExistsRepository returns true', async () => {
    const { sut, checkPlantExistsRepositorySpy } = makeSut()
    checkPlantExistsRepositorySpy.output = true

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(true)
  })

  it('should return false on success', async () => {
    const { sut } = makeSut()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(false)
  })

  it('should throw if CheckPlantExistsRepository throws', async () => {
    const { sut, checkPlantExistsRepositorySpy } = makeSut()
    jest
      .spyOn(checkPlantExistsRepositorySpy, 'some')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })
})
