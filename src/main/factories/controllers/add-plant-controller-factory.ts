import { DbAddPlant } from '@/data/usecases'

import {
  SQLitePlantRepository,
  SQLitePlantWaterFrequencyRepository,
} from '@/infra/db/sqlite'

import { type Controller } from '@/presentation/contracts'
import { AddPlantController } from '@/presentation/controllers'

export const makeAddPlantController = (): Controller => {
  const plantRepository = new SQLitePlantRepository()
  const plantWaterFrequencyRepository =
    new SQLitePlantWaterFrequencyRepository()
  const addPlant = new DbAddPlant(
    plantRepository,
    plantWaterFrequencyRepository,
    plantRepository
  )
  return new AddPlantController(addPlant)
}
