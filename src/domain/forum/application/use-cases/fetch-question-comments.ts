import { Either, right } from 'src/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentRepository } from '../repositories/interfaces/question-comment-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentRepository: IQuestionCommentRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
