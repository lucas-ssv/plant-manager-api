import { type Environment } from '@/domain/entities'

export interface LoadEnvironmentsRepository {
  loadMany: () => Promise<Environment[]>
}
