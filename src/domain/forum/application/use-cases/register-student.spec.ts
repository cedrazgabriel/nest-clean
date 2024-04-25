import { RegisterStudentUseCase } from './register-student'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-student-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryStudentRepository: InMemoryStudentRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register student tests', () => {
  beforeEach(() => {
    inMemoryStudentRepository = new InMemoryStudentRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterStudentUseCase(inMemoryStudentRepository, fakeHasher)
  })

  test('Deve ser possível registrar um novo estudante', async () => {
    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentRepository.items[0],
    })
  })

  test('Deve ser possível hashear a senha do estudante no registro', async () => {
    const result = await sut.execute({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'any_password',
    })

    const hashedPassword = await fakeHasher.hash('any_password')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentRepository.items[0].password).toEqual(hashedPassword)
  })
})
