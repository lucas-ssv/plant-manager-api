export class BadRequestError extends Error {
  constructor() {
    super(
      'The customer request contains invalid data or is missing required information.'
    )
    this.name = 'BadRequestError'
  }
}
