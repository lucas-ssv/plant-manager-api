import { type PlantEnvironment } from '@/domain/entities/plant-environment'

export interface LoadPlantEnvironments {
  perform: () => Promise<PlantEnvironment[]>
}
