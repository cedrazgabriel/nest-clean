import { AppModule } from '@/infra/app.module'
import { DataBaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { StudentFactory } from 'test/factories/make-student'

describe('Authenticate (E2E)', () => {
  let app: INestApplication

  let studentFactory: StudentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DataBaseModule],
      providers: [StudentFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    studentFactory = moduleRef.get(StudentFactory)

    await app.init()
  })

  test('[POST] /sessions', async () => {
    const user = await studentFactory.makePrismaStudent({
      email: 'teste@teste.com',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: user.email,
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })
})
