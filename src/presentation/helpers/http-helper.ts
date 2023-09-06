import { type HttpResponse } from '@/presentation/contracts'
import { BadRequestError, ServerError } from '@/presentation/errors'

export const serverError = (): HttpResponse => {
  const error = new ServerError()
  return {
    statusCode: 500,
    body: {
      error: {
        name: error.name,
        message: error.message,
      },
    },
  }
}

export const noContent = (): HttpResponse => ({
  statusCode: 204,
})

export const badRequest = (): HttpResponse => {
  const error = new BadRequestError()
  return {
    statusCode: 400,
    body: {
      error: {
        name: error.name,
        message: error.message,
      },
    },
  }
}
