import { DbAddPlant } from '@/data/usecases'

import { SQLitePlantRepository } from '@/infra/db/sqlite'

import { type Controller } from '@/presentation/contracts'
import { AddPlantController } from '@/presentation/controllers'

export const makeAddPlantController = (): Controller => {
  const plantRepository = new SQLitePlantRepository()
  const addPlant = new DbAddPlant(plantRepository, plantRepository)
  return new AddPlantController(addPlant)
}
