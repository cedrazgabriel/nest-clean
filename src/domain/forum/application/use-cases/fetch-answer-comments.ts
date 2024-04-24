import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { IAnswerCommentRepository } from '../repositories/interfaces/answer-comment-repository'
import { Either, right } from 'src/core/either'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: IAnswerCommentRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
