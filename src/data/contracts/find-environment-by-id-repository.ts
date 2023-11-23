import { type Environment } from '@/domain/entities'

export interface FindEnvironmentByIdRepository {
  findById: (id: string) => Promise<FindEnvironmentByIdRepository.Result>
}

export namespace FindEnvironmentByIdRepository {
  export interface Result extends Environment {}
}
