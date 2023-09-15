import { setupApp } from '@/main/config'

import request from 'supertest'
import { type Express } from 'express'

let app: Express

describe('contentType', () => {
  beforeAll(() => {
    app = setupApp()
  })

  it('should return correct Content-Type', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    const response = await request(app).get('/test_content_type')
    expect(response.headers['content-type']).toMatch(/application\/json/)
  })
})
