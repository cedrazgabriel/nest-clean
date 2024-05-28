import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { INotificationRepository } from '@/domain/notification/application/repositories/interfaces/notification-repository'
import { PrismaNotificationMapper } from '../../mappers/prisma-notifications-mapper'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

@Injectable()
export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notifications.findUnique({
      where: { id },
    })

    if (!notification) return null

    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification)

    await this.prisma.notifications.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification)

    await this.prisma.notifications.update({
      where: { id: data.id },
      data,
    })
  }
}
