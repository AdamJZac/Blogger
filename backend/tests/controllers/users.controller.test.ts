import { NextFunction, Request, Response } from "express";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import {
  deleteUser,
  getUserById,
  updateUser,
} from "../../src/controllers/users.controller.js";
import { BadRequestError } from "../../src/errors/index.js";
import { User } from "../../src/models/users.model.js";
import { UsersService } from "../../src/services/users.service.js";

function createMockRes() {
  const res = {
    json: vi.fn(),
  };
  return res as unknown as Response;
}
function createMockReq(params: Record<string, string>) {
  return { params } as unknown as Request;
}
function createMockNF() {
  return vi.fn() as unknown as NextFunction;
}

const user1: User = {
  email: "newUser1@mail.com",
  firstName: "New",
  lastName: "User1",
  password: "password1",
  id: "123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Users controllers", () => {
  let mockService: Partial<UsersService>;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeAll(() => {
    mockService = {
      findById: vi
        .fn()
        .mockResolvedValue({ email: "testEmail" } as unknown as User),
      update: vi
        .fn()
        .mockResolvedValue({ email: "testEmail" } as unknown as User),
      delete: vi
        .fn()
        .mockResolvedValue({ email: "testEmail" } as unknown as User),
    };
  });

  beforeEach(() => {
    req = createMockReq({});
    res = createMockRes();
    next = createMockNF();
  });

  it("Should find user when provided with valid id", async () => {
    req = createMockReq({ id: "testId" });

    await getUserById(req, res, next, mockService as UsersService);
    expect(mockService.findById).toHaveBeenCalledWith("testId");
    expect(res.json).toHaveBeenCalledWith({ email: "testEmail" });
  });

  it("Should throw error when missing id", async () => {
    await getUserById(req, res, next, mockService as UsersService);
    expect(next).toHaveBeenCalledWith(
      new BadRequestError(new Error(`Invalid id submitted`))
    );
  });

  it("Should update user when provided with valid data", async () => {
    req.body = user1;
    await updateUser(req, res, next, mockService as UsersService);
    expect(mockService.update).toHaveBeenCalledWith(user1);
    expect(res.json).toHaveBeenCalledWith({ email: "testEmail" });
  });

  it("Should throw error when provided invalid data for update", async () => {
    await updateUser(req, res, next, mockService as UsersService);
    expect(next).toHaveBeenCalledWith(
      new BadRequestError(new Error(`Request body does not match user shape`))
    );
  });

  it("Should delete user when provided with valid data", async () => {
    req.body = user1;
    await deleteUser(req, res, next, mockService as UsersService);
    expect(mockService.delete).toHaveBeenCalledWith(user1);
    expect(res.json).toHaveBeenCalledWith({ email: "testEmail" });
  });

  it("Should throw error when provided invalid data for deletion", async () => {
    await deleteUser(req, res, next, mockService as UsersService);
    expect(next).toHaveBeenCalledWith(
      new BadRequestError(new Error(`Request body does not match user shape`))
    );
  });

  it("Should use live service by default", async () => {
    await getUserById(req, res, next);
    await updateUser(req, res, next);
    await deleteUser(req, res, next);
    expect(next).toHaveBeenCalledTimes(3);
  });
});
