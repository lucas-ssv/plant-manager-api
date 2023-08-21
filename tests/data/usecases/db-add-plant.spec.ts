import { DbAddPlant } from '@/data/usecases'

import { AddPlantRepositoryMock } from '@/tests/data/mocks'
import { mockAddPlantParams } from '@/tests/domain/mocks'

interface CheckPlantExistsRepository {
  some: (plantId: string) => Promise<boolean>
}

class CheckPlantExistsRepositorySpy implements CheckPlantExistsRepository {
  plantId?: string
  output = false

  async some(plantId: string): Promise<boolean> {
    this.plantId = plantId
    return this.output
  }
}

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
    jest.spyOn(addPlantRepositoryMock, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })

  it('should call CheckPlantExistsRepository with correct id', async () => {
    const { sut, checkPlantExistsRepositorySpy } = makeSut()
    const plant = mockAddPlantParams()

    await sut.perform(plant)

    expect(checkPlantExistsRepositorySpy.plantId).toBe(plant.id)
  })

  it('should return true if CheckPlantExistsRepository returns true', async () => {
    const { sut, checkPlantExistsRepositorySpy } = makeSut()
    checkPlantExistsRepositorySpy.output = true

    const isPlantExists = await sut.perform(mockAddPlantParams())

    expect(isPlantExists).toBe(true)
  })
})
