import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NewUser, User, isUser } from "../../src/models/users.model.js";
import { UsersRepository } from "../../src/repositories/users.repo.js";

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
  const newUser3: NewUser = {
    email: "newUser3@mail.com",
    firstName: "New",
    lastName: "User3",
    password: "password3",
  };
  const repo = new UsersRepository();

  beforeAll(async () => {
    try {
      const createdUser1 = await repo.create(newUser1);
      const createdUser3 = await repo.create(newUser3);

      if (!isUser(createdUser1) || !isUser(createdUser3)) {
        throw new Error("Repo created object incorrectly");
      }

      const createdUser1InDb = await repo.findById(createdUser1.id);
      const createdUser3InDb = await repo.findById(createdUser3.id);
      if (
        JSON.stringify(createdUser1) !== JSON.stringify(createdUser1InDb) ||
        JSON.stringify(createdUser3) !== JSON.stringify(createdUser3InDb)
      ) {
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
      const user3 = (await repo.findByEmail(newUser3.email)) as User;

      if (user1) {
        await repo.delete(user1);
      }
      if (user2) {
        await repo.delete(user2);
      }
      if (user3) {
        await repo.delete(user3);
      }
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

  it("Should delete user", async () => {
    const createdUser2 = (await repo.findByEmail(newUser2.email)) as User;

    const deletedUser2 = await repo.delete(createdUser2);

    expect(deletedUser2).toMatchObject(createdUser2);
    expect(isUser(deletedUser2)).toBeTruthy();
  });

  it("Should find by id", async () => {
    const user1 = (await repo.findByEmail(newUser1.email)) as User;
    const userById = await repo.findById(user1.id);
    const userByUserId = await repo.findAllForUserId(user1.id);

    expect(userById).toMatchObject((userByUserId as User[])[0]);
    expect(userById).toMatchObject(user1);
    expect(isUser(userById)).toBeTruthy();
  });

  it("Should find all users", async () => {
    const users = (await repo.findAll()) as User[];
    expect(users.length).toBeGreaterThan(1);
  });

  it("Should execute SQL statement to return all users", async () => {
    const users = (<unknown>(
      await repo.execute("select * from users;")
    )) as User[];
    expect(users.length).toBeGreaterThan(1);
  });

  it("Should not create user with insufficient information", async () => {
    try {
      const result = await repo.create((<unknown>{
        name: "InvalidUser",
      }) as User);
      expect(false).toBeTruthy();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
