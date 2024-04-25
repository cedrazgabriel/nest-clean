import { IStudentRepository } from '@/domain/forum/application/repositories/interfaces/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentRepository implements IStudentRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email.toString() === email)

    if (!student) return null

    return student
  }

  async create(student: Student): Promise<void> {
    this.items.push(student)
  }
}
