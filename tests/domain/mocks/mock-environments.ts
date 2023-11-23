import { type Environment } from '@/domain/entities'

import { faker } from '@faker-js/faker'

export const mockEnvironment = (): Environment => ({
  id: faker.string.uuid(),
  title: faker.word.words(),
})

export const mockEnvironmentsModel = (): Environment[] => [
  mockEnvironment(),
  mockEnvironment(),
]
