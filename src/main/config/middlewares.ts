import { bodyParser, contentType, setupCors as cors } from '@/main/middlewares'

import { type Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
