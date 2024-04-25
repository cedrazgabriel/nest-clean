import { IHashCompare } from '@/domain/forum/application/cryptography/interfaces/hash-compare'
import { IHashGenerator } from '@/domain/forum/application/cryptography/interfaces/hash-generator'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BCryptHasher implements IHashGenerator, IHashCompare {
  private HASH_SALT_LENGTH = 8

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }
}
