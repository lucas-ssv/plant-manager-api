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
      const error = this.validation.validate(httpRequest.body)
      if (error instanceof Error) {
        return {
          statusCode: 400,
          body: {
            error: {
              name: 'BadRequest',
              message:
                'The customer request contains invalid data or is missing required information.',
            },
          },
        }
      }
      await this.addPlant.perform(httpRequest.body)
      return noContent()
    } catch (error) {
      return serverError()
    }
  }
}
