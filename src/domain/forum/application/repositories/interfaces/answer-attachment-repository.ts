import { AnswerAttachment } from 'src/domain/forum/enterprise/entities/answer-attachment'

export interface IAnswerAttachmentRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
