import { PaginationParams } from 'src/core/repositories/pagination-params'
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export interface IAnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  delete(answerComment: AnswerComment): Promise<void>
  create(answerComment: AnswerComment): Promise<void>
}
