import { type LoadPlantsByEnvironment } from '@/domain/usecases'

export interface LoadPlantsByEnvironmentRepository {
  loadManyByEnvironment: (
    environment?: string
  ) => Promise<LoadPlantsByEnvironmentRepository.Result[]>
}

export namespace LoadPlantsByEnvironmentRepository {
  export interface Result extends LoadPlantsByEnvironment.Result {}
}
