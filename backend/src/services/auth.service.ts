import { UsersRepository } from "../repositories/users.repo.js";

export class AuthService {
  readonly #repo: UsersRepository;

  constructor(repo?: UsersRepository) {
    this.#repo = repo ?? new UsersRepository();
  }
}
