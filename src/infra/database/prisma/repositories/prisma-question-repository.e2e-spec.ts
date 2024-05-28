import { IQuestionRepository } from '@/domain/forum/application/repositories/interfaces/questions-repository'

import { AppModule } from '@/infra/app.module'
import { ICacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'

import { Test } from '@nestjs/testing'

import { AttachmentFactory } from 'test/factories/make-attachment'
import { QuestionFactory } from 'test/factories/make-question'
import { QuestionAttachmentFactory } from 'test/factories/make-question-attachment'
import { StudentFactory } from 'test/factories/make-student'

describe('Prisma Question Repository (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let questionFactory: QuestionFactory
  let attachmentFactory: AttachmentFactory
  let questionAttachmentFactory: QuestionAttachmentFactory
  let cacheRepository: ICacheRepository
  let questionRepository: IQuestionRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DataBaseModule, CacheModule],
      providers: [
        StudentFactory,
        QuestionFactory,
        AttachmentFactory,
        QuestionAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)
    questionFactory = moduleRef.get(QuestionFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    questionAttachmentFactory = moduleRef.get(QuestionAttachmentFactory)
    cacheRepository = moduleRef.get(ICacheRepository)
    questionRepository = moduleRef.get(IQuestionRepository)

    await app.init()
  })

  it('deve ser possivel pegar os detalhes da questao em cache', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    const questionDetails = await questionRepository.findDetailsBySlug(slug)

    const cached = await cacheRepository.get(`questions:${slug}:details`)

    expect(cached).toEqual(JSON.stringify(questionDetails))
  })

  it('deve ser possivel retornar o question details do cache em chamas subsequentes', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `questions:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    const questionDetails = await questionRepository.findDetailsBySlug(slug)

    expect(questionDetails).toEqual({ empty: true })
  })

  it('deve ser possivel deletar o cache quando uma questao for atualizada', async () => {
    const user = await studentFactory.makePrismaStudent()

    const question = await questionFactory.makePrismaQuestion({
      authorId: user.id,
    })

    const attachment = await attachmentFactory.makePrismaAttachment()

    await questionAttachmentFactory.makePrismaQuestionAttachment({
      attachmentId: attachment.id,
      questionId: question.id,
    })

    const slug = question.slug.value

    await cacheRepository.set(
      `questions:${slug}:details`,
      JSON.stringify({ empty: true }),
    )

    await questionRepository.save(question)

    const cached = await cacheRepository.get(`questions:${slug}:details`)

    expect(cached).toBeNull()
  })
})
