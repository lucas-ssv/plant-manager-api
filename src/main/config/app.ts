import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './routes'
import { setupSwagger } from './swagger'

import express, { type Express } from 'express'

export const setupApp = (): Express => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
