import { type FindPlantByNameRepository } from '@/data/contracts'

import { type Plant } from '@/domain/entities'

export class FindPlantByNameRepositorySpy implements FindPlantByNameRepository {
  output: Plant | null = null

  async findByName(
    name: string
  ): Promise<FindPlantByNameRepository.Result | null> {
    return this.output
  }
}
