import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { EditQuestionQuestionUseCase } from './edit-question'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository

let sut: EditQuestionQuestionUseCase

describe('Delete question use case tests', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    sut = new EditQuestionQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionAttachmentRepository,
    )
  })

  test('Deve ser possível editar uma questão', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(createdQuestion)
    inMemoryQuestionAttachmentRepository.items.push(
      makeQuestionAttachment({
        questionId: createdQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: createdQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      questionId: createdQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      content: 'new content',
      title: 'new title',
    })
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  test('Não deve ser possível editar uma questão a qual não o pertence', async () => {
    const createdQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionRepository.create(createdQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: createdQuestion.id.toString(),
      content: 'new content',
      title: 'new title',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
