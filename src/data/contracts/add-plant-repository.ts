import { type PlantParams } from '@/domain/usecases'

export interface AddPlantRepository {
  add: (input: AddPlantRepository.AddParams) => Promise<boolean>
}

export namespace AddPlantRepository {
  export interface AddParams extends PlantParams {}
}
