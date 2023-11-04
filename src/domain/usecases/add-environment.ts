export interface AddEnvironment {
  perform: (input: AddEnvironmentParams) => Promise<void>
}

export interface AddEnvironmentParams {
  title: string
}
