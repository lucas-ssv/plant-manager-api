import { type PlantEnvironment } from '@/domain/entities'

export interface LoadPlantEnvironments {
  perform: () => Promise<PlantEnvironment[]>
}
