import { ValueObject } from '@/core/entities/value-object'

export interface CommentWithAuthorProps {
  commentId: string
  content: string
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt?: Date | null
}
export class CommentWithAuthor extends ValueObject<CommentWithAuthorProps> {
  get commentId() {
    return this.commentId
  }

  get content() {
    return this.content
  }

  get authorId() {
    return this.authorId
  }

  get authorName() {
    return this.authorName
  }

  get createdAt() {
    return this.createdAt
  }

  get updatedAt() {
    return this.updatedAt
  }

  static create(props: CommentWithAuthorProps) {
    return new CommentWithAuthor(props)
  }
}
