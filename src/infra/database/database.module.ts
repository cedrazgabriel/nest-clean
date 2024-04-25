import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment-repostiory'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachment-repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answer-repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comment-repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachment-repository'
import { IQuestionRepository } from '@/domain/forum/application/repositories/interfaces/questions-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: IQuestionRepository,
      useClass: PrismaQuestionRepository,
    },
    PrismaQuestionCommentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentRepository,
  ],
  exports: [
    PrismaService,
    IQuestionRepository,
    PrismaQuestionCommentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentRepository,
  ],
})
export class DataBaseModule {}
