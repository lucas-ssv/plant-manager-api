export interface PlantWaterFrequency {
  id: string
  description: string
  time: number
  gap: number
  lastDateWatering: Date | null
}
