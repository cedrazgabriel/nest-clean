import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { CommentOnQuestionQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: CommentOnQuestionQuestionUseCase

describe('Comment on question use case tests', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new CommentOnQuestionQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  test('Deve ser possível adicionar um comentário a alguma questão', async () => {
    const createdQuestion = makeQuestion()

    await inMemoryQuestionRepository.create(createdQuestion)

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: createdQuestion.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'Comentário teste',
    )
  })
})
