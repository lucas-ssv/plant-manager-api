import { type Plant } from '@/domain/entities'

export interface AddPlant {
  perform: (input: Plant) => Promise<boolean>
}
