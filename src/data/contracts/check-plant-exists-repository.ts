export interface CheckPlantExistsRepository {
  check: (name: string) => Promise<boolean>
}
