import { type Plant } from '@/domain/entities'
import { type PlantParams } from '@/domain/usecases'

export interface PlantRepository {
  add: (input: PlantParams) => Promise<void>
  findByName: (name: string) => Promise<Plant | null>
}
