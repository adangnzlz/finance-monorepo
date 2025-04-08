// src/providers/prisma-user-database.provider.ts
import { PrismaDatabaseProvider } from '../providers/prisma-database.provider'
import { prisma } from '../../prisma/prisma-client'
import { User } from '@finance/types'
import { DatabaseProvider } from '../providers/database.provider'

export class PrismaUserDatabaseProvider<T> extends PrismaDatabaseProvider<T> implements DatabaseProvider<T> {
  protected get model() {
    return prisma.user
  }

  protected get modelName(): string {
    return 'user'
  }
}
