import { type Plant } from '@/domain/entities'

export interface LoadPlants {
  perform: (environment?: string) => Promise<Plant[]>
}
