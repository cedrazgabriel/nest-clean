import { PaginationParams } from '@/core/repositories/pagination-params'
import { IQuestionRepository } from '@/domain/forum/application/repositories/interfaces/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionRepository implements IQuestionRepository {
  findById(id: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }

  save(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
