import { type AddPlant } from '@/domain/usecases'

import {
  type HttpRequest,
  type Controller,
  type HttpResponse,
} from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { DataAlreadyExistsError } from '@/presentation/errors'

export class AddPlantController implements Controller {
  constructor(private readonly addPlant: AddPlant) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const isValid = await this.addPlant.perform(httpRequest.body)
      if (!isValid) {
        return badRequest(
          new DataAlreadyExistsError(
            'The plant name already exists in your collection.'
          )
        )
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
