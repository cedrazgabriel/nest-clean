import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { QuestionComment } from 'src/domain/forum/enterprise/entities/question-comment'

export abstract class IQuestionCommentRepository {
  abstract findById(id: string): Promise<QuestionComment | null>

  abstract findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract delete(questionComment: QuestionComment): Promise<void>
  abstract create(questionComment: QuestionComment): Promise<void>
}
