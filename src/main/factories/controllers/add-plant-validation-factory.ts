import { ZodValidatorBuilder } from '@/main/builders'

export const addPlantSchema = new ZodValidatorBuilder()
  .field('name')
  .string()
  .field('description')
  .string()
  .field('plantWaterFrequency')
  .object({
    description: 'string',
    time: 'number',
    gap: 'number',
  })
  .field('environments')
  .array()
  .build()
