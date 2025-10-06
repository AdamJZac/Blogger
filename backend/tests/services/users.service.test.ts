import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { NewUser, User } from "../../src/models/users.model";
import { UsersService } from "../../src/services/users.service.js";

describe("UsersService CRUD Tests", () => {
  const service = new UsersService();

  const newUser: NewUser = {
    email: "sNewUser1@mail.com",
    firstName: "New",
    lastName: "User1",
    password: "password1",
  };
  let user: User;

  beforeAll(async () => {
    user = await service.create(newUser);
  });

  afterAll(async () => {
    await service.delete(user);
  });

  it("Should find all users", async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThanOrEqual(1);
  });
});
