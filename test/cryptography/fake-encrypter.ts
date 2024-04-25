import { IEncrypter } from '@/domain/forum/application/cryptography/interfaces/encrypter'

export class FakeEncrypter implements IEncrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}
