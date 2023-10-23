import { type Plant } from '@/domain/entities'

export interface LoadPlantsByEnvironment {
  perform: (environment: string) => Promise<Plant[]>
}
