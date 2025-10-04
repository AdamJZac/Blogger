import { User } from "../models/users.model.js";
import { UsersRepository } from "../repositories/users.repo.js";
import { Service } from "../types/index.js";

export class UsersService implements Service<User> {
  readonly #repo: UsersRepository;

  constructor(repo?: UsersRepository) {
    this.#repo = repo ?? new UsersRepository();
  }

  async findAll(): Promise<User[]> {
    const users = await this.#repo.findAll();
    if (!users) {
      throw new Error("Error fetching users");
    }
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.#repo.findById(id);
    if (!user) {
      throw new Error(`Error fetching user for ${id}`);
    }
    return user;
  }

  async findAllForUserId(id: string): Promise<User[]> {
    const user = await this.#repo.findAllForUserId(id);
    if (!user) {
      throw new Error(`Error fetching data for userId ${id}`);
    }
    return user;
  }

  async create(user: User): Promise<User> {
    const createdUser = await this.#repo.create(user);
    if (!createdUser) {
      throw new Error(`Error creating user`);
    }
    return createdUser;
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.#repo.update(user);
    if (!updatedUser) {
      throw new Error(`Error updating user`);
    }
    return updatedUser;
  }

  async delete(user: User): Promise<User> {
    const deletedUser = await this.#repo.delete(user);
    if (!deletedUser) {
      throw new Error(`Error deleting user`);
    }
    return deletedUser;
  }
}
