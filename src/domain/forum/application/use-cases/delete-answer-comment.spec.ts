import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })

  test('Deve ser possível excluir um comentário de uma questão', async () => {
    const createdAnswerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(createdAnswerComment)

    await sut.execute({
      answerCommentId: createdAnswerComment.id.toString(),
      authorId: createdAnswerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  test('Não deve ser possível excluir um comentário de uma questão ao qual não o pertence', async () => {
    const createdAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryAnswerCommentRepository.create(createdAnswerComment)

    const result = await sut.execute({
      answerCommentId: createdAnswerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
