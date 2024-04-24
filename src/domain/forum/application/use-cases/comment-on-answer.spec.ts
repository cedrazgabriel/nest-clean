import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { CommentOnAnswerAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerAnswerUseCase

describe('Comment on answer use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sut = new CommentOnAnswerAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  test('Deve ser possível adicionar um comentário a alguma resposta', async () => {
    const createdAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      answerId: createdAnswer.id.toString(),
      authorId: createdAnswer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
