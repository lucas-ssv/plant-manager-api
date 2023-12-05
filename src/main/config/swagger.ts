import { type Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '@/main/docs/swagger.json'

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
