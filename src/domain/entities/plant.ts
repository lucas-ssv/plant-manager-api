import { type Environment, type PlantWaterFrequency } from '@/domain/entities'

export interface Plant {
  name: string
  description: string
  waterTips: string
  photo: string
  environments: Environment[]
  plantWaterFrequency: PlantWaterFrequency
}
