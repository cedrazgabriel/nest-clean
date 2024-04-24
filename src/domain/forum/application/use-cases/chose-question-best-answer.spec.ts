import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { ChoseQuestionBestAnswerUseCase } from './chose-question-best-answer'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from '../../../../core/errors/not-allowed-error'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: ChoseQuestionBestAnswerUseCase

describe('Chose best answer to question use case tests', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new ChoseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    )
  })

  test('Deve ser possível definir uma melhor resposta para uma questão', async () => {
    const createdQuestion = makeQuestion({
      authorId: new UniqueEntityId(),
    })

    await inMemoryQuestionRepository.create(createdQuestion)

    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(),
        questionId: createdQuestion.id,
      },
      new UniqueEntityId(),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    await sut.execute({
      authorId: createdQuestion.authorId.toString(),
      answerId: createdAnswer.id.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(
      createdAnswer.id,
    )
  })

  test('Não deve ser possível definir uma melhor resposta de uma pergunta a qual não o pertence', async () => {
    const createdQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionRepository.create(createdQuestion)

    const createdAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(),
        questionId: createdQuestion.id,
      },
      new UniqueEntityId(),
    )

    await inMemoryAnswerRepository.create(createdAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: createdAnswer.id.toString(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
