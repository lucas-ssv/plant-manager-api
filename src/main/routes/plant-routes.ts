import { type Router } from 'express'
import { adaptRoute, validatorAdapter } from '../adapters'
import { makeAddPlantController } from '../factories/controllers/add-plant-controller-factory'
import { addPlantSchema } from '../factories/controllers/add-plant-validation-factory'

export default (router: Router): void => {
  router.post(
    '/add-plant',
    validatorAdapter(addPlantSchema),
    adaptRoute(makeAddPlantController())
  )
}
