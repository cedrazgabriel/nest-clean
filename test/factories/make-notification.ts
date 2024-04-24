import { faker } from '@faker-js/faker'
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
