import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { AuthenticateStudentUseCase } from './authenticate-student'
import { makeStudent } from 'test/factories/make-student'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate student tests', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateStudentUseCase(
      inMemoryStudentRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  test('Deve ser possível autenticar um estudante', async () => {
    const student = makeStudent({
      email: 'teste@teste.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentRepository.items.push(student)

    const result = await sut.execute({
      email: student.email,
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  test('Não deve ser possível autenticar com uma senha incorreta', async () => {
    const student = makeStudent({
      email: 'teste@teste.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentRepository.items.push(student)

    const result = await sut.execute({
      email: student.email,
      password: 'senha-incorreta',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
