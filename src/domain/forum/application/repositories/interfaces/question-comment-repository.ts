import { PaginationParams } from 'src/core/repositories/pagination-params'
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'

export interface IQuestionCommentRepository {
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>
  create(questionComment: QuestionComment): Promise<void>
}
