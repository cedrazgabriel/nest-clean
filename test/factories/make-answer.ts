import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  Answer,
  AnswerProps,
} from 'src/domain/forum/enterprise/entities/answer'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answer
}
