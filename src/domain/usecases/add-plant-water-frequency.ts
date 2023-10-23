export interface AddPlantWaterFrequency {
  perform: (input: AddPlantWaterFrequencyParams) => Promise<string>
}

export interface AddPlantWaterFrequencyParams {
  description: string
  time: number
  gap: number
  lastDateWatering: Date | null
}
