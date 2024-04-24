import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions tests', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  test('Deve ser possível buscar as questões recentes', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 20) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 18) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2024, 0, 23) }),
    )

    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions.length).toBe(3)
    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2024, 0, 23),
      }),
      expect.objectContaining({
        createdAt: new Date(2024, 0, 20),
      }),
      expect.objectContaining({
        createdAt: new Date(2024, 0, 18),
      }),
    ])
  })

  test('Deve ser possível buscar as questões recentes paginadas', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({ page: 2 })

    expect(result.value?.questions.length).toBe(2)
  })
})
