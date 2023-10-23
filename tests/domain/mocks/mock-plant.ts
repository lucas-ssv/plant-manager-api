import { type Plant } from '@/domain/entities'
import { type PlantParams } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const mockAddPlantParams = (): PlantParams => ({
  name: faker.word.words({ count: 1 }),
  description: faker.word.words(),
  waterTips: faker.word.words(),
  photo: faker.internet.url(),
  plantWaterFrequency: {
    description: faker.lorem.words(),
    time: faker.number.int(1),
    gap: faker.number.int(),
    lastDateWatering: new Date(),
  },
  environments: [faker.lorem.word(), faker.lorem.word()],
})

export const mockPlantModel = (environment = faker.word.words()): Plant => ({
  id: faker.string.uuid(),
  name: faker.word.words({ count: 1 }),
  description: faker.word.words(),
  waterTips: faker.word.words(),
  photo: faker.internet.url(),
  environments: [
    {
      id: faker.string.uuid(),
      title: environment,
    },
  ],
  plantWaterFrequency: {
    id: faker.string.uuid(),
    description: faker.word.words(),
    time: faker.number.int(1),
    gap: faker.number.int(),
    lastDateWatering: new Date(),
  },
})

export const mockPlantModels = (): Plant[] => {
  return [mockPlantModel(), mockPlantModel()]
}
