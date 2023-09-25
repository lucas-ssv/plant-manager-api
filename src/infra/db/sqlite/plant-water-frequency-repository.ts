import { type PlantWaterFrequencyRepository } from '@/data/contracts'

import { prisma } from '@/infra/db'

export class SQLitePlantWaterFrequencyRepository
  implements PlantWaterFrequencyRepository
{
  async add(input: PlantWaterFrequencyRepository.Params): Promise<string> {
    const plantWaterFrequency = await prisma.plantWaterFrequency.create({
      data: input,
    })
    return plantWaterFrequency.id
  }
}
