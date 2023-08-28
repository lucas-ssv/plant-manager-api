import { type Plant } from '@/domain/entities'

export interface LoadPlantsRepository {
  loadMany: () => Promise<Plant[]>
}
