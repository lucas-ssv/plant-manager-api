import { type LoadPlantsByEnvironment } from '@/domain/usecases'

import {
  type HttpRequest,
  type Controller,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers'

export class LoadPlantsByEnvironmentController implements Controller {
  constructor(
    private readonly loadPlantsByEnvironment: LoadPlantsByEnvironment
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const plants = await this.loadPlantsByEnvironment.perform(
        httpRequest.query?.q
      )
      return ok(plants)
    } catch (error) {
      return serverError(error)
    }
  }
}
