import { type Plant } from '@/domain/entities'

export interface LoadPlants {
  perform: () => Promise<Plant[]>
}
