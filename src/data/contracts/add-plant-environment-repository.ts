export interface AddPlantEnvironmentRepository {
  add: (input: AddPlantEnvironmentRepository.Params) => Promise<boolean>
}

export namespace AddPlantEnvironmentRepository {
  export interface Params {
    plantId: string
    environmentId: string
  }
}
