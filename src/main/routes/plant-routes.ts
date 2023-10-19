import { adaptRoute, validatorAdapter } from '@/main/adapters'
import {
  addPlantSchema,
  makeAddPlantController,
  makeLoadPlantsController,
} from '@/main/factories/controllers'

import { type Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/add-plant',
    validatorAdapter(addPlantSchema),
    adaptRoute(makeAddPlantController())
  )
  router.get('/plants', adaptRoute(makeLoadPlantsController()))
}
