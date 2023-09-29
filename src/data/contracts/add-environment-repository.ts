export interface AddEnvironmentRepository {
  add: (input: string[]) => Promise<void>
}
