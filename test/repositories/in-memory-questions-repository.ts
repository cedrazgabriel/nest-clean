import { DomainEvents } from 'src/core/events/domain-events'
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { IQuestionAttachmentRepository } from 'src/domain/forum/application/repositories/interfaces/question-attachment-repository'
import { IQuestionRepository } from 'src/domain/forum/application/repositories/interfaces/questions-repository'
import { Question } from 'src/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements IQuestionRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentRepository: IQuestionAttachmentRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) return null

    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items[itemIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async create(question: Question): Promise<void> {
    this.items.push(question)
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)

    this.questionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
