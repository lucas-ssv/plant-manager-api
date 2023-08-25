import { type PlantEnvironment } from '@/domain/entities'

import { faker } from '@faker-js/faker'

export const mockPlantEnvironmentsModel = (): PlantEnvironment[] => [
  {
    key: faker.lorem.word(),
    title: faker.lorem.words(),
  },
]
