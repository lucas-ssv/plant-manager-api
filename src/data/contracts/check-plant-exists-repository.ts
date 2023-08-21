export interface CheckPlantExistsRepository {
  some: (name: string) => Promise<boolean>
}
