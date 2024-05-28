import { PrismaNotificationMapper } from '@/infra/database/mappers/prisma-notifications-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import {
  Notification,
  NotificationProps,
} from 'src/domain/notification/enterprise/entities/notification'

// O partial no typescript pega uma interface ou tipo e torna suas propriedades em opcionais.
export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      title: faker.lorem.sentence(4),
      recipientId: new UniqueEntityId(),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )

  return notification
}
@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const notification = makeNotification(data)

    await this.prisma.notifications.create({
      data: PrismaNotificationMapper.toPersistence(notification),
    })

    return notification
  }
}
