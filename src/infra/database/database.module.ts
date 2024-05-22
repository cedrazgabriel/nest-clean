import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment-repostiory'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachment-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comment-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachment-repository'
import { IQuestionRepository } from '@/domain/forum/application/repositories/interfaces/questions-repository'
import { IStudentRepository } from '@/domain/forum/application/repositories/interfaces/students-repository'
import { PrismaStudentRepository } from './prisma/repositories/prisma-student-repository'
import { IQuestionCommentRepository } from '@/domain/forum/application/repositories/interfaces/question-comment-repository'
import { IQuestionAttachmentRepository } from '@/domain/forum/application/repositories/interfaces/question-attachment-repository'
import { IAnswersRepository } from '@/domain/forum/application/repositories/interfaces/answer-repository'
import { IAnswerCommentRepository } from '@/domain/forum/application/repositories/interfaces/answer-comment-repository'
import { IAnswerAttachmentRepository } from '@/domain/forum/application/repositories/interfaces/answer-attachment-repository'
import { IAttachmentRepository } from '@/domain/forum/application/repositories/interfaces/attachments-repository'
import { PrismaAttachmentRepository } from './prisma/repositories/prisma-attachment-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IQuestionRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: IStudentRepository,
      useClass: PrismaStudentRepository,
    },
    {
      provide: IQuestionCommentRepository,
      useClass: PrismaQuestionCommentRepository,
    },
    {
      provide: IQuestionAttachmentRepository,
      useClass: PrismaQuestionAttachmentRepository,
    },
    {
      provide: IAnswersRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: IAnswerCommentRepository,
      useClass: PrismaAnswerCommentRepository,
    },
    {
      provide: IAnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },
    {
      provide: IAttachmentRepository,
      useClass: PrismaAttachmentRepository,
    },
  ],
  exports: [
    PrismaService,
    IQuestionRepository,
    IStudentRepository,
    IQuestionCommentRepository,
    IQuestionAttachmentRepository,
    IAnswersRepository,
    IAnswerCommentRepository,
    IAnswerAttachmentRepository,
    IAttachmentRepository,
  ],
})
export class DataBaseModule {}
