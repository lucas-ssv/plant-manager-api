import { type AddPlantWaterFrequencyParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAddPlantWaterFrequencyParams =
  (): AddPlantWaterFrequencyParams => ({
    title: faker.lorem.words(),
    time: faker.string.alphanumeric(),
    gap: faker.number.int(),
  })
