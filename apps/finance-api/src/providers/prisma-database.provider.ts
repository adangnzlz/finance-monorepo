// src/providers/prisma-database.provider.ts
import { PrismaClient } from "../../prisma/generated";
import { DatabaseProvider } from "./database.provider";

export abstract class PrismaDatabaseProvider<T> implements DatabaseProvider<T> {
  protected abstract get model(): any;
  protected prisma = new PrismaClient();

  async read(): Promise<T[]> {
    return this.model.findMany();
  }

  async create(data: T): Promise<void> {
    await this.model.create({ data });
  }

  async getByFields(query?: Partial<T>): Promise<T[]> {
    return this.model.findMany({ where: query });
  }

  async clear(): Promise<void> {
    await this.prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${this.modelName}" RESTART IDENTITY CASCADE;`
    );
  }

  async deleteByField(field: keyof T, value: any): Promise<void> {
    await this.model.deleteMany({ where: { [field]: value } });
  }

  async close(): Promise<void> {
    await this.prisma.$disconnect();
  }

  protected abstract get modelName(): string;
}
