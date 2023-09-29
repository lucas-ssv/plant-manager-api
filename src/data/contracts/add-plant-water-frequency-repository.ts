import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

export interface AddPlantWaterFrequencyRepository {
  add: (input: AddPlantWaterFrequencyRepository.Params) => Promise<string>
}

export namespace AddPlantWaterFrequencyRepository {
  export interface Params extends AddPlantWaterFrequencyParams {}
}
