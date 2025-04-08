// src/providers/prisma-user-database.provider.ts
import { PrismaDatabaseProvider } from "../providers/prisma-database.provider";
import { prisma } from "../../prisma/prisma-client";
import { Transaction } from "@finance/types";
import { DatabaseProvider } from "../providers/database.provider";

export class PrismaTransactionDatabaseProvider<T>
  extends PrismaDatabaseProvider<T>
  implements DatabaseProvider<T>
{
  protected get model() {
    return prisma.transaction;
  }

  protected get modelName(): string {
    return "transaction";
  }
}
