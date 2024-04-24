import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from 'src/domain/forum/enterprise/entities/question-attachment'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return questionAttachment
}
