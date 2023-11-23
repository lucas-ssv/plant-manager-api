import { type Environment } from '@/domain/entities'

export interface FindEnvironmentByIdRepository {
  perform: (id: string) => Promise<FindEnvironmentByIdRepository.Result>
}

export namespace FindEnvironmentByIdRepository {
  export interface Result extends Environment {}
}
