import { type LoadPlantsEnvironment } from '@/domain/usecases'

export interface LoadPlantsEnvironmentRepository {
  loadMany: (
    environment?: string
  ) => Promise<LoadPlantsEnvironmentRepository.Result[]>
}

export namespace LoadPlantsEnvironmentRepository {
  export interface Result extends LoadPlantsEnvironment.Result {}
}
