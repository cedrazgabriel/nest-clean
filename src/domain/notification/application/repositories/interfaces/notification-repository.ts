import { Notification } from 'src/domain/notification/enterprise/entities/notification'

export abstract class INotificationRepository {
  abstract findById(id: string): Promise<Notification | null>
  abstract create(notification: Notification): Promise<void>
  abstract save(notification: Notification): Promise<void>
}
