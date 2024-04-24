import { EntityBase } from 'src/core/entities/entity'
import { UniqueEntityId } from 'src/core/entities/unique-entity-id'

interface InstructorProps {
  name: string
}
export class Instructor extends EntityBase<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityId) {
    const student = new Instructor({ ...props }, id)

    return student
  }
}
