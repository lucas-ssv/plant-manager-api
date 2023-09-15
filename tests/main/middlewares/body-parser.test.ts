import { setupApp } from '@/main/config'
import { faker } from '@faker-js/faker'

import { type Express } from 'express'
import request from 'supertest'

let app: Express

describe('bodyParser', () => {
  beforeAll(() => {
    app = setupApp()
  })

  it('should parse JSON correctly', async () => {
    const name = faker.person.firstName()
    const lastName = faker.person.lastName()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    const response = await request(app).post('/test_body_parser').send({
      name,
      lastName,
    })
    expect(response.body).toEqual({ name, lastName })
  })
})
