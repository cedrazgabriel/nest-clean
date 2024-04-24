import { faker } from '@faker-js/faker'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from 'src/domain/forum/enterprise/entities/answer-comment'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
