import { type Environment } from '@/domain/entities'

export interface LoadEnvironments {
  perform: () => Promise<Environment[]>
}
