import { AnswerAttachment } from 'src/domain/forum/enterprise/entities/answer-attachment'

export abstract class IAnswerAttachmentRepository {
  abstract findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  abstract deleteManyByAnswerId(answerId: string): Promise<void>
}
