import { type PlantParams } from '@/domain/usecases'

export interface AddPlantRepository {
  add: (input: AddPlantRepository.AddParams) => Promise<string>
}

export namespace AddPlantRepository {
  export interface AddParams extends Omit<PlantParams, 'plantWaterFrequency'> {
    plantWaterFrequencyId: string
  }
}
