import { type HttpResponse } from '@/presentation/contracts'

export const serverError = (error: Error): HttpResponse => {
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

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: {
      name: error.name,
      message: error.message,
    },
  },
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
})
