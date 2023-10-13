import { type AddPlantWaterFrequencyRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

export class SQLitePlantWaterFrequencyRepository
  implements AddPlantWaterFrequencyRepository
{
  async add(input: AddPlantWaterFrequencyRepository.Params): Promise<string> {
    const plantWaterFrequency = await prisma.plantWaterFrequency.create({
      data: input,
    })
    return plantWaterFrequency.id
  }
}
