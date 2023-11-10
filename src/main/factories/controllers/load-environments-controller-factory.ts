import { DbLoadEnvironments } from '@/data/usecases'

import { SQLiteEnvironmentRepository } from '@/infra/db/sqlite'

import { type Controller } from '@/presentation/contracts'
import { LoadEnvironmentsController } from '@/presentation/controllers'

export const makeLoadEnvironmentsController = (): Controller => {
  const loadEnvironmentsRepository = new SQLiteEnvironmentRepository()
  const loadEnvironments = new DbLoadEnvironments(loadEnvironmentsRepository)
  return new LoadEnvironmentsController(loadEnvironments)
}
