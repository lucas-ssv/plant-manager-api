import { ZodValidatorBuilder } from '@/main/builders'

export const addPlantSchema = new ZodValidatorBuilder()
  .field('name')
  .string()
  .field('description')
  .string()
  .build()
