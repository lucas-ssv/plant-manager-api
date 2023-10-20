import { DbLoadPlants } from '@/data/usecases'

import { SQLitePlantRepository } from '@/infra/db/sqlite'

import { type Controller } from '@/presentation/contracts'
import { LoadPlantsController } from '@/presentation/controllers'

export const makeLoadPlantsController = (): Controller => {
  const loadPlantsRepository = new SQLitePlantRepository()
  const loadPlants = new DbLoadPlants(loadPlantsRepository)
  return new LoadPlantsController(loadPlants)
}
