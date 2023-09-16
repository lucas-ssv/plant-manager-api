import { setupMiddlewares } from './middlewares'
import { setupRoutes } from './routes'

import express, { type Express } from 'express'

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
