import { type Environment } from '@/domain/entities'

export interface FindEnvironmentByNameRepository {
  findByName: (
    name: string
  ) => Promise<FindEnvironmentByNameRepository.Result | null>
}

export namespace FindEnvironmentByNameRepository {
  export interface Result extends Environment {}
}
