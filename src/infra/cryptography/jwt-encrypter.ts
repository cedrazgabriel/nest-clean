import { IEncrypter } from '@/domain/forum/application/cryptography/interfaces/encrypter'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtEncrypter implements IEncrypter {
  constructor(private readonly jwtService: JwtService) {}
  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
