import { type PlantEnvironment } from '@/domain/entities'

export interface LoadPlantEnvironmentsRepository {
  loadMany: () => Promise<PlantEnvironment[]>
}
