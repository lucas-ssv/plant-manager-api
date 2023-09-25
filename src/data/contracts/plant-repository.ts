import { type Plant } from '@/domain/entities'
import { type PlantParams } from '@/domain/usecases'

export interface PlantRepository {
  add: (input: PlantRepository.AddParams) => Promise<boolean>
  findByName: (
    name: string
  ) => Promise<PlantRepository.FindByNameResponse | null>
}

export namespace PlantRepository {
  export interface AddParams extends PlantParams {}
  export interface FindByNameResponse extends Plant {}
}
