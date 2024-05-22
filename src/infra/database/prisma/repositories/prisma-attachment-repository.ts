import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { IAttachmentRepository } from '@/domain/forum/application/repositories/interfaces/attachments-repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '../../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentRepository implements IAttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPersistence(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}
