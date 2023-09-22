import { mockAddPlantWaterFrequencyParams } from '@/tests/domain/mocks'

import { PlantWaterFrequencyRepositorySpy } from '@/tests/data/mocks'
import { DbAddPlantWaterFrequency } from '@/data/usecases'

describe('DbAddPlantWaterFrequency UseCase', () => {
  it('should call PlantWaterFrequencyRepository with correct data', async () => {
    const plantWaterFrequencyRepositorySpy =
      new PlantWaterFrequencyRepositorySpy()
    const sut = new DbAddPlantWaterFrequency(plantWaterFrequencyRepositorySpy)
    const input = mockAddPlantWaterFrequencyParams()

    await sut.perform(input)

    expect(plantWaterFrequencyRepositorySpy.input).toEqual(input)
  })

  it('should throw if PlantWaterFrequencyRepository throws', async () => {
    const plantWaterFrequencyRepositorySpy =
      new PlantWaterFrequencyRepositorySpy()
    jest
      .spyOn(plantWaterFrequencyRepositorySpy, 'add')
      .mockImplementationOnce(() => {
        throw new Error()
      })
    const sut = new DbAddPlantWaterFrequency(plantWaterFrequencyRepositorySpy)

    const promise = sut.perform(mockAddPlantWaterFrequencyParams())

    await expect(promise).rejects.toThrowError()
  })
})
