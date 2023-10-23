import {
  type AddEnvironmentParams,
  type AddEnvironment,
} from '@/domain/usecases'
import { type AddEnvironmentRepository } from '@/data/contracts'

export class DbAddEnvironment implements AddEnvironment {
  constructor(
    private readonly addEnvironmentRepository: AddEnvironmentRepository
  ) {}

  async perform(input: AddEnvironmentParams): Promise<void> {
    await this.addEnvironmentRepository.add(input)
  }
}
