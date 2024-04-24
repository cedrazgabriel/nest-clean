import { DomainEvents } from 'src/core/events/domain-events'
import { EventHandler } from 'src/core/events/event-handler'
import { IQuestionRepository } from 'src/domain/forum/application/repositories/interfaces/questions-repository'
import { AnswerCreatedEvent } from 'src/domain/forum/enterprise/events/answer-created-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionRepository: IQuestionRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      // Hack do JS: Quando passamos o bind na chamada do metódo, ele força o
      // this ser o próprio this da chamada e não da classe/arquivo que chamou
      // o metódo
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}
