export interface AddEnvironment {
  perform: (input: AddEnvironmentParams) => Promise<string>
}

export interface AddEnvironmentParams {
  title: string
}
