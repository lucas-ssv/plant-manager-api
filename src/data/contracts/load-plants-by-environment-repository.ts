import { type Plant } from '@/domain/entities'

export interface LoadPlantsByEnvironmentRepository {
  loadManyByEnvironment: (
    environment: string
  ) => Promise<LoadPlantsByEnvironmentRepository.Result[]>
}

export namespace LoadPlantsByEnvironmentRepository {
  export interface Result extends Plant {}
}
