import { type AddPlant } from '@/domain/usecases'

import {
  type HttpRequest,
  type Controller,
  type HttpResponse,
} from '@/presentation/contracts'
import { noContent, serverError } from '@/presentation/helpers'

export class AddPlantController implements Controller {
  constructor(
    private readonly validation: any,
    private readonly addPlant: AddPlant
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      await this.addPlant.perform(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
