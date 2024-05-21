import { PaginationParams } from 'src/core/repositories/pagination-params'
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'

export abstract class IQuestionCommentRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract delete(questionComment: QuestionComment): Promise<void>
  abstract create(questionComment: QuestionComment): Promise<void>
}
