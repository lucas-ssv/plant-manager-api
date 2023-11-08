import { DbLoadPlantsEnvironment } from '@/data/usecases'
import { SQLitePlantEnvironmentRepository } from '@/infra/db/sqlite'
import { type Controller } from '@/presentation/contracts'
import { LoadPlantsEnvironmentController } from '@/presentation/controllers'

export const makeLoadPlantsEnvironmentController = (): Controller => {
  const plantsEnvironment = new SQLitePlantEnvironmentRepository()
  const loadPlantsEnvironment = new DbLoadPlantsEnvironment(plantsEnvironment)
  return new LoadPlantsEnvironmentController(loadPlantsEnvironment)
}
