import { DbAddPlant } from '@/data/usecases'

import { AddPlantRepositoryMock } from '@/tests/data/mocks'
import { mockAddPlantParams } from '@/tests/domain/mocks'

describe('AddPlant UseCase', () => {
  it('should call AddPlantRepository with correct data', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    const sut = new DbAddPlant(addPlantRepositoryMock)
    const plant = mockAddPlantParams()

    await sut.perform(plant)

    expect(addPlantRepositoryMock.input).toEqual(plant)
  })

  it('should call AddPlantRepository only once', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    const sut = new DbAddPlant(addPlantRepositoryMock)

    await sut.perform(mockAddPlantParams())

    expect(addPlantRepositoryMock.callsCount).toBe(1)
  })

  it('should throw if AddPlantRepository throws', async () => {
    const addPlantRepositoryMock = new AddPlantRepositoryMock()
    jest.spyOn(addPlantRepositoryMock, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new DbAddPlant(addPlantRepositoryMock)

    const promise = sut.perform(mockAddPlantParams())

    await expect(promise).rejects.toThrowError()
  })
})
