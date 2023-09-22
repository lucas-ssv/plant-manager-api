export interface AddPlantWaterFrequency {
  perform: (input: AddPlantWaterFrequencyParams) => Promise<string>
}

export interface AddPlantWaterFrequencyParams {
  title: string
  time: string
  gap: number
}
