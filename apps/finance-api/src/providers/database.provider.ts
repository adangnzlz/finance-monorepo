export interface DatabaseProvider<T> {
  read(): Promise<T[]>;
  create(data: T): Promise<void>;
  getByField(field: keyof T, value: any): Promise<T | undefined>;
  clear(): Promise<void>;
  close?(): void
}
