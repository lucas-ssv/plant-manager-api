import { DbAddPlant } from '@/data/usecases'

import { mockAddPlantParams, mockPlantModel } from '@/tests/domain/mocks'
import { PlantRepositoryMock } from '@/tests/data/mocks'

interface SutTypes {
  sut: DbAddPlant
  plantRepositoryMock: PlantRepositoryMock
}

const makeSut = (): SutTypes => {
  const plantRepositoryMock = new PlantRepositoryMock()
  const sut = new DbAddPlant(plantRepositoryMock)
  return {
    sut,
    plantRepositoryMock,
  }
}

describe('DbAddPlant UseCase', () => {
  it('should call PlantRepository.add() with correct data', async () => {
    const { sut, plantRepositoryMock } = makeSut()
    const plant = mockAddPlantParams()

    await sut.perform(plant)

    expect(plantRepositoryMock.input).toEqual(plant)
  })

  it('should call AddPlantRepository.add() only once', async () => {
    const { sut, plantRepositoryMock } = makeSut()

    await sut.perform(mockAddPlantParams())

    expect(plantRepositoryMock.callsCount).toBe(1)
  })

  it('should throw if AddPlantRepository.add() throws', async () => {
    const { sut, plantRepositoryMock } = makeSut()
    jest.spyOn(plantRepositoryMock, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should return true if PlantRepository.findByName() returns a plant', async () => {
    const { sut, plantRepositoryMock } = makeSut()
    plantRepositoryMock.output = mockPlantModel()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(true)
  })

  it('should return false on success', async () => {
    const { sut } = makeSut()

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(false)
  })

  it('should throw if PlantRepository.findByName() throws', async () => {
    const { sut, plantRepositoryMock } = makeSut()
    jest.spyOn(plantRepositoryMock, 'findByName').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })
})
