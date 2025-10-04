export interface Repository<T> {
  findAll(): Promise<T[] | undefined>;
  findById(id: string): Promise<T | undefined>;
  findAllForUserId(id: string): Promise<T[] | undefined>;
  create(obj: T): Promise<T | undefined>;
  update(obj: T): Promise<T | undefined>;
  delete(obj: T): Promise<T | undefined>;
  execute(sqlStatement: string): Promise<T | undefined>;
}

export interface Service<T> {
  readonly #repo: Repository<T>;

  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  findAllForUserId(id: string): Promise<T[]>;
  create(obj: T): Promise<T>;
  update(obj: T): Promise<T>;
  delete(obj: T): Promise<T>;
}
