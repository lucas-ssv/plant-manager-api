export interface AddPlantEnvironment {
  add: (input: AddPlantEnvironment.Params) => Promise<void>
}

export namespace AddPlantEnvironment {
  export interface Params {
    plantId: string
    environmentId: string
  }
}
