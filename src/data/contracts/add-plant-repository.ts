import { type Plant } from '@/domain/entities'

export interface AddPlantRepository {
  load: (input: Plant) => Promise<void>
}
