import { INotificationRepository } from 'src/domain/notification/application/repositories/interfaces/notification-repository'
import { Notification } from 'src/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements INotificationRepository {
  public items: Notification[] = []

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id)

    if (!notification) return null

    return notification
  }

  async save(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}
