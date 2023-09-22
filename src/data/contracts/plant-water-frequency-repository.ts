import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

export interface PlantWaterFrequencyRepository {
  add: (input: PlantWaterFrequencyRepository.Params) => Promise<string>
}

export namespace PlantWaterFrequencyRepository {
  export interface Params extends AddPlantWaterFrequencyParams {}
}
