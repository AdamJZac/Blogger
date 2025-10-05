import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NewUser, User, isUser } from "../../dist/models/users.model.js";
import { UsersRepository } from "../../dist/repositories/users.repo.js";

describe("UsersRepositoryCRUD", () => {
  const newUser1: NewUser = {
    email: "newUser1@mail.com",
    firstName: "New",
    lastName: "User1",
    password: "password1",
  };
  const newUser2: NewUser = {
    email: "newUser2@mail.com",
    firstName: "New",
    lastName: "User2",
    password: "password2",
  };
  const repo = new UsersRepository();

  beforeAll(async () => {
    try {
      const createdUser1 = await repo.create(newUser1);

      if (!isUser(createdUser1)) {
        throw new Error("Repo created object incorrectly");
      }

      const createdUser1InDb = await repo.findById(createdUser1.id);
      if (JSON.stringify(createdUser1) !== JSON.stringify(createdUser1InDb)) {
        throw new Error("Repo returned object incorrectly");
      }
    } catch (err) {
      throw new Error(`Error setting up UsersRepositoryCRUD test: ${err}`);
    }
  });

  afterAll(async () => {
    try {
      const user1 = (await repo.findByEmail(newUser1.email)) as User;
      const user2 = (await repo.findByEmail(newUser2.email)) as User;

      const result1 = await repo.delete(user1);
      const result2 = await repo.delete(user2);
    } catch (err) {
      throw new Error(`Error cleaning up UsersRepositoryCRUD test: ${err}`);
    }
  });

  it("Should create user", async () => {
    const createdUser2 = await repo.create(newUser2);

    expect(createdUser2).toMatchObject(newUser2);
    expect(isUser(createdUser2)).toBeTruthy();
  });

  it("Should update user", async () => {
    const createdUser1 = (await repo.findByEmail(newUser1.email)) as User;
    createdUser1.password = "updatedPassword2";
    createdUser1.firstName = "updatedNew";

    const updatedUser1 = await repo.update(createdUser1);

    expect(updatedUser1).toMatchObject(createdUser1);
    expect(isUser(updatedUser1)).toBeTruthy();
  });
});
