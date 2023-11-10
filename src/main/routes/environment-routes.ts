import { adaptRoute } from '@/main/adapters'
import { makeLoadEnvironmentsController } from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.get('/environments', adaptRoute(makeLoadEnvironmentsController()))
}
