import { Either, left, right } from 'src/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { INotificationRepository } from '../repositories/interfaces/notification-repository'
import { NotAllowedError } from 'src/core/errors/not-allowed-error'
import { ResourceNotFoundError } from 'src/core/errors/resource-not-found-error'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  NotAllowedError | ResourceNotFoundError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({
      notification,
    })
  }
}
