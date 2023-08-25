import { type PlantEnvironment } from '@/domain/entities'

import { faker } from '@faker-js/faker'

export const mockPlantEnvironmentsModel = (): PlantEnvironment[] => [
  {
    id: faker.string.uuid(),
    title: faker.lorem.words(),
  },
]
