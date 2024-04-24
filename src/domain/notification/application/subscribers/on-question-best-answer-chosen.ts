import { DomainEvents } from 'src/core/events/domain-events'
import { EventHandler } from 'src/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { IAnswersRepository } from 'src/domain/forum/application/repositories/interfaces/answer-repository'
import { QuestionBestAnswerChosenEvent } from 'src/domain/forum/enterprise/events/question-best-answer-chosen-event'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: IAnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      // Hack do JS: Quando passamos o bind na chamada do metódo, ele força o
      // this ser o próprio this da chamada e não da classe/arquivo que chamou
      // o metódo
      this.sendNewQuestionBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendNewQuestionBestAnswerChosenNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua resposta foi escolhida!`,
        content: `A resposta que você enviou em "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor.`,
      })
    }
  }
}
