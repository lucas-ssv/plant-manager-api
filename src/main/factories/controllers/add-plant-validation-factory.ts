import { ZodValidatorBuilder } from '@/main/builders'

export const addPlantSchema = new ZodValidatorBuilder()
  .field('name')
  .string()
  .field('description')
  .string()
  .field('plantWaterFrequency')
  .object({
    title: 'string',
    time: 'string',
    gap: 'number',
  })
  .field('environments')
  .array()
  .build()
