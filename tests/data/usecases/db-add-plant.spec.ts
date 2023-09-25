import { DbAddPlant } from '@/data/usecases'

import { mockAddPlantParams, mockPlantModel } from '@/tests/domain/mocks'
import { AddPlantRepositoryMock } from '@/tests/data/mocks'
import { type FindPlantByNameRepository } from '@/data/contracts'
import { type Plant } from '@/domain/entities'

interface SutTypes {
  sut: DbAddPlant
  findPlantByNameRepositoryMock: FindPlantByNameRepositoryMock
  addPlantRepositoryMock: AddPlantRepositoryMock
}

class FindPlantByNameRepositoryMock implements FindPlantByNameRepository {
  output: Plant | null = null

  async findByName(
    name: string
  ): Promise<FindPlantByNameRepository.Result | null> {
    return this.output
  }
}

const makeSut = (): SutTypes => {
  const findPlantByNameRepositoryMock = new FindPlantByNameRepositoryMock()
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const sut = new DbAddPlant(
    findPlantByNameRepositoryMock,
    addPlantRepositoryMock
  )
  return {
    sut,
    findPlantByNameRepositoryMock,
    addPlantRepositoryMock,
  }
}

describe('DbAddPlant UseCase', () => {
  it('should call AddPlantRepository.add() with correct data', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()
    const plant = mockAddPlantParams()

    await sut.perform(plant)

    expect(addPlantRepositoryMock.input).toEqual(plant)
  })

  it('should call AddPlantRepository.add() only once', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()

    await sut.perform(mockAddPlantParams())

    expect(addPlantRepositoryMock.callsCount).toBe(1)
  })

  it('should throw if AddPlantRepository.add() throws', async () => {
    const { sut, addPlantRepositoryMock } = makeSut()
    jest.spyOn(addPlantRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should return false if FindPlantByNameRepository.findByName() returns a plant', async () => {
    const { sut, findPlantByNameRepositoryMock } = makeSut()
    findPlantByNameRepositoryMock.output = mockPlantModel()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(false)
  })

  it('should return true on success', async () => {
    const { sut } = makeSut()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(true)
  })

  it('should throw if PlantRepository.findByName() throws', async () => {
    const { sut, findPlantByNameRepositoryMock } = makeSut()
    jest
      .spyOn(findPlantByNameRepositoryMock, 'findByName')
      .mockImplementationOnce(() => {
        throw new Error()
      })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })
})
