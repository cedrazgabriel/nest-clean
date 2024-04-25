import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from 'src/domain/forum/enterprise/entities/student'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeStudent(
  override: Partial<StudentProps> = {},
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}
