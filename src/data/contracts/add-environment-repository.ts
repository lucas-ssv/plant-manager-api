export interface AddEnvironmentRepository {
  add: (input: AddEnvironmentRepository.Params) => Promise<boolean>
}

export namespace AddEnvironmentRepository {
  export interface Params {
    environments: string[]
    plantId: string
  }
}
