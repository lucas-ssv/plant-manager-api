export class ServerError extends Error {
  constructor() {
    super('An internal server error occurred while processing the request.')
    this.name = 'InternalServerError'
  }
}
