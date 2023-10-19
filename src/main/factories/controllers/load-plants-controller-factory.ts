import { DbLoadPlants } from '@/data/usecases'

import { SQLitePlantEnvironmentRepository } from '@/infra/db/sqlite'

import { type Controller } from '@/presentation/contracts'
import { LoadPlantsController } from '@/presentation/controllers'

export const makeLoadPlantsController = (): Controller => {
  const loadPlantsRepository = new SQLitePlantEnvironmentRepository()
  const loadPlants = new DbLoadPlants(loadPlantsRepository)
  return new LoadPlantsController(loadPlants)
}
