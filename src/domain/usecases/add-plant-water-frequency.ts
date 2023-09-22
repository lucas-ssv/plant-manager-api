export interface AddPlantWaterFrequency {
  perform: (input: AddPlantWaterFrequencyParams) => Promise<void>
}

export interface AddPlantWaterFrequencyParams {
  title: string
  time: string
  gap: number
}
