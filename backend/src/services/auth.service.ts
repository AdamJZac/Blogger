import { User } from "src/models/users.model";
import { UsersRepository } from "src/repositories/users.repo";

export class AuthService {
  readonly repo: UsersRepository;

  constructor(repo?: UsersRepository) {
    this.repo = repo ?? new UsersRepository();
  }

  async getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      resolve([{ email: "test", password: "test" }]);
    });
  }
}
