import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { IStudentRepository } from '../repositories/interfaces/students-repository'
import { IHashCompare } from '../cryptography/interfaces/hash-compare'
import { IEncrypter } from '../cryptography/interfaces/encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentRepository: IStudentRepository,
    private hashCompare: IHashCompare,
    private encrypter: IEncrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    await this.studentRepository.create(student)

    return right({ accessToken })
  }
}
