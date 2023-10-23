import { type Plant } from '@/domain/entities'

export interface LoadPlantsRepository {
  loadMany: (environment?: string) => Promise<LoadPlantsRepository.Result[]>
}

export namespace LoadPlantsRepository {
  export interface Result extends Plant {}
}
