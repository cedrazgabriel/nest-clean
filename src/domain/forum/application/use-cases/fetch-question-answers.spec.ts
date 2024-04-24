import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachment-repository'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers tests', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  test('Deve ser possível buscar as respostas de uma questão', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('1') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('1') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('1') }),
    )

    const result = await sut.execute({ questionId: '1', page: 1 })

    expect(result.value?.answers.length).toBe(3)
  })

  test('Deve ser possível buscar as repostas de uma questão paginadas ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('1') }),
      )
    }

    const result = await sut.execute({ questionId: '1', page: 2 })

    expect(result.value?.answers.length).toBe(2)
  })
})
