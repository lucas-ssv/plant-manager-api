import { mockPlantModels } from '@/tests/domain/mocks'

import { LoadPlantsController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helpers'
import { LoadPlantsSpy } from '@/tests/presentation/mocks'

describe('LoadPlantsController', () => {
  it('should call LoadPlants', async () => {
    const loadPlantsSpy = new LoadPlantsSpy()
    const sut = new LoadPlantsController(loadPlantsSpy)

    await sut.handle({})

    expect(loadPlantsSpy.callsCount).toBe(1)
  })

  it('should return 200 if LoadPlants return a list of plants', async () => {
    const loadPlantsSpy = new LoadPlantsSpy()
    const fakePlants = mockPlantModels()
    loadPlantsSpy.output = fakePlants
    const sut = new LoadPlantsController(loadPlantsSpy)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(httpResponse.body))
  })

  it('should return 500 if LoadPlants throws', async () => {
    const loadPlantsSpy = new LoadPlantsSpy()
    jest.spyOn(loadPlantsSpy, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new LoadPlantsController(loadPlantsSpy)

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
