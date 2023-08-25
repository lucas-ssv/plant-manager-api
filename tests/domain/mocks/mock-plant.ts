import { type PlantParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAddPlantParams = (): PlantParams => ({
  name: faker.word.words({ count: 1 }),
  description: faker.word.words(),
  waterTips: faker.word.words(),
  photo: faker.internet.url(),
})
