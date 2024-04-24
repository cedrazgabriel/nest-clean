import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from 'src/domain/forum/enterprise/entities/question'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
