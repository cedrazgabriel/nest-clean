import { IHashCompare } from '@/domain/forum/application/cryptography/interfaces/hash-compare'
import { IHashGenerator } from '@/domain/forum/application/cryptography/interfaces/hash-generator'

export class FakeHasher implements IHashGenerator, IHashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
