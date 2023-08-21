import { type PlantParams } from '@/domain/usecases'

export interface AddPlantRepository {
  add: (input: PlantParams) => Promise<void>
}
