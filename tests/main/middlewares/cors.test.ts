import { setupApp } from '@/main/config'

import { type Express } from 'express'
import request from 'supertest'

let app: Express

describe('cors', () => {
  beforeAll(() => {
    app = setupApp()
  })

  it('should allow requests from allowed origins', async () => {
    app.get('/test_cors', (req, res) => {
      res.status(200).send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
  })
})
