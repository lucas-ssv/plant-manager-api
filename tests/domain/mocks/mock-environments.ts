import { type Environment } from '@/domain/entities'

import { faker } from '@faker-js/faker'

export const mockEnvironmentsModel = (): Environment[] => [
  {
    id: faker.string.uuid(),
    title: faker.lorem.words(),
  },
]
