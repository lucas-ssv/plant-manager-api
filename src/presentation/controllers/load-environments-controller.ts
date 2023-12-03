import { type LoadEnvironments } from '@/domain/usecases'

import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers'

export class LoadEnvironmentsController implements Controller {
  constructor(private readonly loadEnvironments: LoadEnvironments) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const environments = await this.loadEnvironments.perform()
      return ok(environments)
    } catch (error) {
      return serverError(error)
    }
  }
}
