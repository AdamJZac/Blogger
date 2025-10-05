import { describe, expect, it } from "vitest";
import {
  isNewUser,
  isUser,
  NewUser,
  User,
  userToSafeUser,
} from "../../src/models/users.model.js";

describe("Users model tests", () => {
  const validNewUser: NewUser = {
    email: "newUser1@mail.com",
    firstName: "New",
    lastName: "User1",
    password: "password1",
  };
  const invalidNewUser: NewUser = (<unknown>{
    name: "InvalidNewUser",
  }) as NewUser;

  const validUser: User = {
    email: "newUser1@mail.com",
    firstName: "New",
    lastName: "User1",
    password: "password1",
    id: "testId",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const invalidUser: User = (<unknown>{
    name: "InvalidUser",
  }) as User;

  it("Should identify a valid NewUser", () => {
    expect(isNewUser(validNewUser)).toBeTruthy();
  });

  it("Should identify an invalid NewUser", () => {
    expect(isNewUser(invalidNewUser)).toBeFalsy();
  });

  it("Should identify a valid User", () => {
    expect(isUser(validUser)).toBeTruthy();
  });

  it("Should identify an invalid User", () => {
    expect(isUser(invalidUser)).toBeFalsy();
  });

  it("Should correctly turn a User in a SafeUser", () => {
    const safeUser = userToSafeUser(validUser);
    expect(validUser).toMatchObject(safeUser);
    expect(safeUser).not.toHaveProperty("password");
  });

  it("Should identify invalid Objects", () => {
    expect(isNewUser(null)).toBeFalsy();
    expect(isUser(null)).toBeFalsy();
  });
});
