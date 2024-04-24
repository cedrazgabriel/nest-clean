import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityId } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'
import { vi } from 'vitest'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  private aggregate: CustomAggregate //eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.ocurredAt = new Date()
    this.aggregate = aggregate
  }

  getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('domain events tests', () => {
  test('deve ser possível disparar e ouvir eventos', () => {
    // Função de spy nativa do vitest para poder testar se de fato a função do
    // callback foi disparada
    const callbackSpy = vi.fn()

    //  A Função register na classe de Domains Events, espera receber uma função
    //  de call back e o nome do evento que ela vai ouvir
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    const aggregate = CustomAggregate.create()

    // Como o metódo create chama a função addDomainEvent herdada de Aggregate
    // Root, esperamos que o array de domain events tenha um evento adicionado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Essa operação simula a chamada que o repositório associado ao banco de da
    // dos vai chamar quando a entidade for de fato persistida
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Assegura que a função de call back foi chamada
    expect(callbackSpy).toHaveBeenCalled()
    // E que houve a limpeza da lista de envetos p essa entidade
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
