import { adaptRoute, validatorAdapter } from '@/main/adapters'
import {
  addPlantSchema,
  makeAddPlantController,
} from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/add-plant',
    validatorAdapter(addPlantSchema),
    adaptRoute(makeAddPlantController())
  )
}
