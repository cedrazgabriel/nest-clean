import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { EditAnswerAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: EditAnswerAnswerUseCase

describe('Delete answer use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    sut = new EditAnswerAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerAttachmentRepository,
    )
  })

  test('Deve ser possível editar uma resposta', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await inMemoryAnswerRepository.create(createdAnswer)
    inMemoryAnswerAttachmentRepository.items.push(
      makeAnswerAttachment({
        answerId: createdAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: createdAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      authorId: createdAnswer.authorId.toString(),
      answerId: createdAnswer.id.toString(),
      content: 'new content',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'new content',
    })
    expect(
      inMemoryAnswerRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswerRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  test('Não deve ser possível editar uma resposta a qual não o pertence', async () => {
    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: createdAnswer.id.toString(),
      content: 'new content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
