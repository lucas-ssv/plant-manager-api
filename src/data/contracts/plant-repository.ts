import { type PlantParams } from '@/domain/usecases'

export interface PlantRepository {
  add: (input: PlantParams) => Promise<void>
}
