import { setupMiddlewares } from './middlewares'

import express, { type Express } from 'express'

export const setupApp = (): Express => {
  const app = express()
  setupMiddlewares(app)
  return app
}
