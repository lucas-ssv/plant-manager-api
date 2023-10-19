import { type Environment, type PlantWaterFrequency } from '@/domain/entities'

export interface Plant {
  id: string
  name: string
  description: string
  waterTips: string | null
  photo: string | null
  plantWaterFrequency: PlantWaterFrequency | null
  environments?: Environment[]
}
