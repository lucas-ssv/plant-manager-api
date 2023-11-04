import { type Plant } from '@/domain/entities'

export interface LoadPlantsByEnvironment {
  perform: (environment?: string) => Promise<LoadPlantsByEnvironment.Result[]>
}

export namespace LoadPlantsByEnvironment {
  export interface Result {
    id: string
    title: string
    plant: Plant[]
  }
}
