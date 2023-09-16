import { Router, type Express } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  readdirSync(path.resolve(__dirname, '..', 'routes')).forEach((file) => {
    import(`../routes/${file}`)
  })
}
