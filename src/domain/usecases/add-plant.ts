import { type PlantWaterFrequency } from '@/domain/entities'

export interface AddPlant {
  perform: (input: PlantParams) => Promise<boolean>
}

export interface PlantParams {
  name: string
  description: string
  waterTips: string
  photo: string
  plantWaterFrequency: Omit<PlantWaterFrequency, 'id'>
  environments: string[]
}
