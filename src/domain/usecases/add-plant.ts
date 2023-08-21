export interface AddPlant {
  perform: (input: PlantParams) => Promise<boolean>
}

export interface PlantParams {
  name: string
  description: string
  waterTips: string
  photo: string
}
