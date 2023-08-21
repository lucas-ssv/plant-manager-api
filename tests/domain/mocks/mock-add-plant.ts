import { type Plant } from '@/domain/entities'

import { faker } from '@faker-js/faker'

export const mockAddPlantParams = (): Plant => ({
  id: faker.string.uuid(),
  name: faker.word.words({ count: 1 }),
  description: faker.word.words(),
  waterTips: faker.word.words(),
  photo: faker.internet.url(),
})
