import { Repository } from "../types/index.js";

export class BlogsRepository implements Repository<string, string> {
  findAll(): Promise<string[] | undefined> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  findByEmail(id: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  findAllForUserId(id: string): Promise<string[] | undefined> {
    throw new Error("Method not implemented.");
  }
  create(obj: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  update(obj: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  delete(obj: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
  execute(sqlStatement: string): Promise<string | undefined> {
    throw new Error("Method not implemented.");
  }
}
