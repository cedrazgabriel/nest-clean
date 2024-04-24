import { Either, left, right } from 'src/core/either'
import { Question } from '../../enterprise/entities/question'
import { IAnswersRepository } from '../repositories/interfaces/answer-repository'
import { IQuestionRepository } from '../repositories/interfaces/questions-repository'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'

interface ChoseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type ChoseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class ChoseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private answerRepository: IAnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoseQuestionBestAnswerUseCaseRequest): Promise<ChoseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question,
    })
  }
}
