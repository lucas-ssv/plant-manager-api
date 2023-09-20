export class DataAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DataAlreadyExistsError'
  }
}
