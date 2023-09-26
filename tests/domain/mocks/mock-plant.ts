import { type Plant } from '@/domain/entities'
import { type PlantParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAddPlantParams = (): PlantParams => ({
  name: faker.word.words({ count: 1 }),
  description: faker.word.words(),
  waterTips: faker.word.words(),
  photo: faker.internet.url(),
  plantWaterFrequency: {
    title: faker.lorem.words(),
    time: faker.lorem.word(),
    gap: faker.number.int(),
  },
})

export const mockPlantModel = (): Plant => ({
  id: faker.string.uuid(),
  name: faker.word.words({ count: 1 }),
  description: faker.word.words(),
  waterTips: faker.word.words(),
  photo: faker.internet.url(),
  environments: [
    {
      id: faker.string.uuid(),
      title: faker.word.words(),
    },
  ],
  plantWaterFrequency: {
    id: faker.string.uuid(),
    title: faker.word.words(),
    time: faker.lorem.word(),
    gap: faker.number.int(),
  },
})

export const mockPlantModels = (): Plant[] => {
  return [mockPlantModel(), mockPlantModel()]
}
