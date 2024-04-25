import { IEncrypter } from '@/domain/forum/application/cryptography/interfaces/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { IHashCompare } from '@/domain/forum/application/cryptography/interfaces/hash-compare'
import { BCryptHasher } from './bcrypt-hasher'
import { IHashGenerator } from '@/domain/forum/application/cryptography/interfaces/hash-generator'

@Module({
  providers: [
    {
      provide: IEncrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: IHashCompare,
      useClass: BCryptHasher,
    },
    {
      provide: IHashGenerator,
      useClass: BCryptHasher,
    },
  ],
  exports: [IEncrypter, IHashCompare, IHashGenerator],
})
export class CryptographyModule {}
