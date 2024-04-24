import { IQuestionRepository } from '../repositories/interfaces/questions-repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { IQuestionCommentRepository } from '../repositories/interfaces/question-comment-repository'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Either, left, right } from 'src/core/either'
import { ResourceNotFoundError } from '../../../../core/errors/resource-not-found-error'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionQuestionUseCase {
  constructor(
    private questionRepository: IQuestionRepository,
    private questionCommentRepository: IQuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) return left(new ResourceNotFoundError())

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return right({
      questionComment,
    })
  }
}
