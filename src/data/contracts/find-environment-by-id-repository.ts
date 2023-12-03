import { type Environment } from '@/domain/entities'

export interface FindEnvironmentByIdRepository {
  findById: (id: string) => Promise<FindEnvironmentByIdRepository.Result | null>
}

export namespace FindEnvironmentByIdRepository {
  export interface Result extends Environment {}
}
