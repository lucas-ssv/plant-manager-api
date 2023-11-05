import { type AddPlantEnvironment } from '@/domain/usecases'

export interface AddPlantEnvironmentRepository {
  add: (input: AddPlantEnvironmentRepository.Params) => Promise<void>
}

export namespace AddPlantEnvironmentRepository {
  export interface Params extends AddPlantEnvironment.Params {}
}
