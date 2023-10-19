import {
  type HttpRequest,
  type Controller,
  type HttpResponse,
} from '@/presentation/contracts'
import { ok, serverError } from '@/presentation/helpers'

import { type LoadPlants } from '@/domain/usecases'

export class LoadPlantsController implements Controller {
  constructor(private readonly loadPlants: LoadPlants) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const plants = await this.loadPlants.perform()
      return ok(plants)
    } catch (error) {
      return serverError(error)
    }
  }
}
