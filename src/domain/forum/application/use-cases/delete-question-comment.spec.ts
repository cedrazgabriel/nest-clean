import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment use case tests', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  test('Deve ser possível excluir um comentário de uma questão', async () => {
    const createdQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(createdQuestionComment)

    await sut.execute({
      questionCommentId: createdQuestionComment.id.toString(),
      authorId: createdQuestionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  test('Não deve ser possível excluir um comentário de uma questão ao qual não o pertence', async () => {
    const createdQuestionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionCommentRepository.create(createdQuestionComment)

    const result = await sut.execute({
      questionCommentId: createdQuestionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
