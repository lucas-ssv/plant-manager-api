import { mockAddPlantWaterFrequencyParams } from '@/tests/domain/mocks'

import { AddPlantWaterFrequencyRepositorySpy } from '@/tests/data/mocks'
import { DbAddPlantWaterFrequency } from '@/data/usecases'

describe('DbAddPlantWaterFrequency UseCase', () => {
  it('should call AddPlantWaterFrequencyRepository with correct data', async () => {
    const addPlantWaterFrequencyRepositorySpy =
      new AddPlantWaterFrequencyRepositorySpy()
    const sut = new DbAddPlantWaterFrequency(
      addPlantWaterFrequencyRepositorySpy
    )
    const input = mockAddPlantWaterFrequencyParams()

    await sut.perform(input)

    expect(addPlantWaterFrequencyRepositorySpy.input).toEqual(input)
  })

  it('should throw if AddPlantWaterFrequencyRepository throws', async () => {
    const addPlantWaterFrequencyRepositorySpy =
      new AddPlantWaterFrequencyRepositorySpy()
    jest
      .spyOn(addPlantWaterFrequencyRepositorySpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbAddPlantWaterFrequency(
      addPlantWaterFrequencyRepositorySpy
    )

    const promise = sut.perform(mockAddPlantWaterFrequencyParams())

    await expect(promise).rejects.toThrowError()
  })
})
