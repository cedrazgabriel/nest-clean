import { Notification } from 'src/domain/notification/enterprise/entities/notification'

export interface INotificationRepository {
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}
