import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from 'src/domain/forum/enterprise/entities/answer-attachment'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answerAttachment
}
