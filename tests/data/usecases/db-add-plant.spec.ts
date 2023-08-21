import { DbAddPlant } from '@/data/usecases'

import { AddPlantRepositoryMock } from '@/tests/data/mocks'
import { mockAddPlantParams } from '@/tests/domain/mocks'

interface SutTypes {
  sut: DbAddPlant
  addPlantRepositoryMock: AddPlantRepositoryMock
}

const makeSut = (): SutTypes => {
  const addPlantRepositoryMock = new AddPlantRepositoryMock()
  const sut = new DbAddPlant(addPlantRepositoryMock)
  return {
    sut,
    addPlantRepositoryMock,
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
    jest.spyOn(addPlantRepositoryMock, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })
})
