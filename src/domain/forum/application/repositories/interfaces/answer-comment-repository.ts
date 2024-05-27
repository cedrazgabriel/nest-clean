import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { AnswerComment } from 'src/domain/forum/enterprise/entities/answer-comment'

export abstract class IAnswerCommentRepository {
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract findManyByAnswerIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>

  abstract delete(answerComment: AnswerComment): Promise<void>
  abstract create(answerComment: AnswerComment): Promise<void>
}
