import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { execSync } from 'child_process'
import { DomainEvents } from '@/core/events/domain-events'
import { Redis } from 'ioredis'
import { envSchema } from '@/infra/env/env'

// Carregar todas as variáveis de ambiente
config({ path: '.env', override: true })

// Carregar variáveis de ambiente de teste, e se já houver alguma pré definida anteriormente no .env, sobrescrever
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()
const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB,
})

function generateUniqueDataBaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL enviroment variable')
  }
  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schemaId)

  return url.toString()
}
const schemaId = randomUUID()

beforeAll(async () => {
  const databaseUrl = generateUniqueDataBaseUrl(schemaId)

  DomainEvents.shouldRun = false

  await redis.flushdb()

  process.env.DATABASE_URL = databaseUrl

  execSync('npx prisma migrate deploy')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
