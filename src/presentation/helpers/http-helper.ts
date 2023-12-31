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

export const created = (): HttpResponse => ({
  statusCode: 201,
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
})
