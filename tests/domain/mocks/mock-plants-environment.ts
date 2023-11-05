import { type LoadPlantsEnvironment } from '@/domain/usecases'

import { faker } from '@faker-js/faker'

export const plantsEnvironmentModel = (): LoadPlantsEnvironment.Result[] => [
  {
    environment: {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
    },
    plants: [
      {
        id: faker.string.uuid(),
        name: faker.word.words(),
        description: faker.lorem.words(),
        photo: faker.image.url(),
        waterTips: faker.lorem.words(),
        plantWaterFrequency: {
          id: faker.string.uuid(),
          description: faker.word.words(),
          gap: faker.number.int(1),
          time: faker.number.int(1),
          lastDateWatering: new Date(),
        },
      },
    ],
  },
]
