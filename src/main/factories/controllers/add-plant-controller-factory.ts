import { DbAddPlant } from '@/data/usecases'
import { PlantRepository } from '@/infra/db/sqlite'
import { type Controller } from '@/presentation/contracts'
import { AddPlantController } from '@/presentation/controllers'

export const makeAddPlantController = (): Controller => {
  const plantRepository = new PlantRepository()
  const addPlant = new DbAddPlant(plantRepository, plantRepository)
  return new AddPlantController(addPlant)
}
