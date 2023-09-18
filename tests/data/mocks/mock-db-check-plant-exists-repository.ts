import { type CheckPlantExistsRepository } from '@/data/contracts'

export class CheckPlantExistsRepositorySpy
  implements CheckPlantExistsRepository
{
  name?: string
  output = false

  async check(name: string): Promise<boolean> {
    this.name = name
    return this.output
  }
}
