import { type AddPlant } from '@/domain/usecases'

import {
  type HttpRequest,
  type Controller,
  type HttpResponse,
  type Validation,
} from '@/presentation/contracts'
import { badRequest, noContent, serverError } from '@/presentation/helpers'

export class AddPlantController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addPlant: AddPlant
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request = httpRequest.body
      const error = this.validation.validate(request)
      if (error instanceof Error) {
        return badRequest()
      }
      await this.addPlant.perform(request)
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
