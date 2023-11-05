import { type Environment, type Plant } from '@/domain/entities'

export interface LoadPlantsEnvironment {
  perform: (environment?: string) => Promise<LoadPlantsEnvironment.Result>
}

export namespace LoadPlantsEnvironment {
  export interface Result {
    environment: Environment
    plants: Omit<Plant[], 'environments'>
  }
}
