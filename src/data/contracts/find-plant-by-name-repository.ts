import { type Plant } from '@/domain/entities'

export interface FindPlantByNameRepository {
  findByName: (name: string) => Promise<FindPlantByNameRepository.Result | null>
}

export namespace FindPlantByNameRepository {
  export interface Result extends Plant {}
}
