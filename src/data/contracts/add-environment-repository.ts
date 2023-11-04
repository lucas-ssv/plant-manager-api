export interface AddEnvironmentRepository {
  add: (input: AddEnvironmentRepository.Params) => Promise<void>
}

export namespace AddEnvironmentRepository {
  export interface Params {
    title: string
  }
}
