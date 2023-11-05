export interface AddEnvironmentRepository {
  add: (input: AddEnvironmentRepository.Params) => Promise<string>
}

export namespace AddEnvironmentRepository {
  export interface Params {
    title: string
  }
}
