import { type LoadPlantsEnvironment } from '@/domain/usecases'

import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers'

export class LoadPlantsEnvironmentController implements Controller {
  constructor(private readonly loadPlantsEnvironment: LoadPlantsEnvironment) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const plantsEnvironment = await this.loadPlantsEnvironment.perform(
        httpRequest.query?.q
      )
      return ok(plantsEnvironment)
    } catch (error) {
      return serverError(error)
    }
  }
}
