import { DbAddPlant } from '@/data/usecases'
import { ValidateUuidAdapter } from '@/infra'

import {
  SQLiteEnvironmentRepository,
  SQLitePlantEnvironmentRepository,
  SQLitePlantRepository,
  SQLitePlantWaterFrequencyRepository,
} from '@/infra/db/sqlite'

import { type Controller } from '@/presentation/contracts'
import { AddPlantController } from '@/presentation/controllers'

export const makeAddPlantController = (): Controller => {
  const environmentRepository = new SQLiteEnvironmentRepository()
  const plantRepository = new SQLitePlantRepository()
  const plantWaterFrequencyRepository =
    new SQLitePlantWaterFrequencyRepository()
  const validateUuidAdapter = new ValidateUuidAdapter()
  const plantEnvironmentRepository = new SQLitePlantEnvironmentRepository()
  const addPlant = new DbAddPlant(
    plantRepository,
    plantWaterFrequencyRepository,
    plantRepository,
    validateUuidAdapter,
    environmentRepository,
    plantEnvironmentRepository,
    environmentRepository,
    environmentRepository
  )
  return new AddPlantController(addPlant)
}
