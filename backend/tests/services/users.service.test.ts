import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { isUser, NewUser, User } from "../../src/models/users.model.js";
import { UsersRepository } from "../../src/repositories/users.repo.js";
import { UsersService } from "../../src/services/users.service.js";

const newUser1: NewUser = {
  email: "ServiceNewUser1@mail.com",
  firstName: "New",
  lastName: "User1",
  password: "password1",
};
const newUser2: NewUser = {
  email: "ServiceNewUser2@mail.com",
  firstName: "New",
  lastName: "User2",
  password: "password2",
};
const newUser3: NewUser = {
  email: "ServiceNewUser3@mail.com",
  firstName: "New",
  lastName: "User3",
  password: "password3",
};
const newUser4: NewUser = {
  email: "ServiceNewUser4@mail.com",
  firstName: "New",
  lastName: "User4",
  password: "password4",
};

const fullUser1: User = {
  email: "ServiceNewUser1@mail.com",
  firstName: "New",
  lastName: "User1",
  password: "password1",
  id: "u1",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const fullUser2: User = {
  email: "ServiceNewUser2@mail.com",
  firstName: "New",
  lastName: "User2",
  password: "password2",
  id: "u2",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const fullUser3: User = {
  email: "ServiceNewUser3@mail.com",
  firstName: "New",
  lastName: "User3",
  password: "password3",
  id: "u3",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const fullUser4: User = {
  email: "ServiceNewUser4@mail.com",
  firstName: "New",
  lastName: "User4",
  password: "password4",
  id: "u4",
  createdAt: new Date(),
  updatedAt: new Date(),
};
const mockDB: User[] = [fullUser1, fullUser2, fullUser3, fullUser4];

describe("UsersService CRUD", () => {
  const defaultRepoService = new UsersService();
  let service: UsersService;

  beforeAll(async () => {
    const mockRepo: Partial<UsersRepository> = {
      findAll: vi.fn().mockResolvedValue(mockDB),
      findById: vi.fn((id: string) => {
        return mockDB.find(
          (element) => element.id === id
        ) as unknown as Promise<User | undefined>;
      }),
      findByEmail: vi.fn((email: string) => {
        return mockDB.find(
          (element) => element.email === email
        ) as unknown as Promise<User | undefined>;
      }),
      findAllForUserId: vi.fn((id: string) => {
        return [
          mockDB.find((element) => element.id === id),
        ] as unknown as Promise<User[] | undefined>;
      }),
      create: vi.fn((user: NewUser) => {
        return mockDB.find(
          (element) => element.email === user.email
        ) as unknown as Promise<User | undefined>;
      }),
      update: vi.fn((user: User) => {
        return mockDB.find(
          (element) => element.email === user.email
        ) as unknown as Promise<User | undefined>;
      }),
      delete: vi.fn((user: User) => {
        return mockDB.find(
          (element) => element.email === user.email
        ) as unknown as Promise<User | undefined>;
      }),
    };

    try {
      service = new UsersService(mockRepo as UsersRepository);
    } catch (err) {
      throw new Error(`Error setting up UsersServiceCRUD test: ${err}`);
    }
  });

  afterAll(async () => {
    try {
      try {
        const createdUser1 = await service.findByEmail(newUser1.email);
        await service.delete(createdUser1);
      } catch (err) {
        if (
          err instanceof Error &&
          err.message !== `Error fetching user for ${newUser1.email}`
        ) {
          throw new Error("Error cleaning up newUser1");
        }
      }

      try {
        const createdUser2 = await service.findByEmail(newUser2.email);
        await service.delete(createdUser2);
      } catch (err) {
        if (
          err instanceof Error &&
          err.message !== `Error fetching user for ${newUser2.email}`
        ) {
          throw new Error("Error cleaning up newUser2");
        }
      }

      try {
        const createdUser3 = await service.findByEmail(newUser3.email);
        await service.delete(createdUser3);
      } catch (err) {
        if (
          err instanceof Error &&
          err.message !== `Error fetching user for ${newUser3.email}`
        ) {
          throw new Error("Error cleaning up newUser3");
        }
      }
    } catch (err) {
      throw new Error(`Error cleaning up UsersRepositoryCRUD test: ${err}`);
    }
  });

  it("Should be able to use the default repo created for the service", async () => {
    try {
      const createdUser4 = await defaultRepoService.create(newUser4);
      await defaultRepoService.delete(createdUser4);
    } catch (err) {
      throw new Error(`Error with default repo service ${err}`);
    }
  });

  it("Should find all users", async () => {
    const users = await service.findAll();
    expect(users.length).toBeGreaterThanOrEqual(1);
  });

  it("Should create user", async () => {
    const createdUser2 = await service.create(newUser2);

    expect(createdUser2).toMatchObject(newUser2);
    expect(isUser(createdUser2)).toBeTruthy();
  });

  it("Should update user", async () => {
    const createdUser1 = (await service.findByEmail(newUser1.email)) as User;
    createdUser1.password = "updatedPassword2";
    createdUser1.firstName = "updatedNew";

    const updatedUser1 = await service.update(createdUser1);

    expect(updatedUser1).toMatchObject(createdUser1);
    expect(isUser(updatedUser1)).toBeTruthy();
  });

  it("Should delete user", async () => {
    const createdUser2 = (await service.findByEmail(newUser2.email)) as User;

    const deletedUser2 = await service.delete(createdUser2);

    expect(deletedUser2).toMatchObject(createdUser2);
    expect(isUser(deletedUser2)).toBeTruthy();
  });

  it("Should find by id", async () => {
    const user1 = (await service.findByEmail(newUser1.email)) as User;
    const userById = await service.findById(user1.id);
    const userByUserId = await service.findAllForUserId(user1.id);

    expect(userById).toMatchObject((userByUserId as User[])[0]);
    expect(userById).toMatchObject(user1);
    expect(isUser(userById)).toBeTruthy();
  });

  it("Should find all users", async () => {
    const users = (await service.findAll()) as User[];
    expect(users.length).toBeGreaterThan(1);
  });

  it("Should not create user with insufficient information", async () => {
    try {
      const result = await service.create((<unknown>{
        name: "InvalidUser",
      }) as User);
      expect(false).toBeTruthy();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});

describe("UsersService errors", () => {
  let mockService: UsersService;

  beforeAll(() => {
    const mockRepo: Partial<UsersRepository> = {
      findAll: vi.fn().mockResolvedValue([]),
      findById: vi.fn().mockResolvedValue(undefined),
      findByEmail: vi.fn().mockResolvedValue(undefined),
      findAllForUserId: vi.fn().mockResolvedValue([]),
      create: vi.fn().mockResolvedValue(undefined),
      update: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
    };
    mockService = new UsersService(mockRepo as UsersRepository);
  });

  it("Should throw an error when no data is returned for findAll()", async () => {
    try {
      const result = await mockService.findAll();
      throw new Error(
        `MockService did not correctly throw error for findAll(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe("Error fetching users");
    }
  });

  it("Should throw an error when no data is returned for findById()", async () => {
    const id = "testId";
    try {
      const result = await mockService.findById(id);
      throw new Error(
        `MockService did not correctly throw error for findById(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(`Error fetching user for ${id}`);
    }
  });

  it("Should throw an error when no data is returned for findByEmail()", async () => {
    const email = "testEmail";
    try {
      const result = await mockService.findByEmail(email);
      throw new Error(
        `MockService did not correctly throw error for findByEmail(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(`Error fetching user for ${email}`);
    }
  });

  it("Should throw an error when no data is returned for findAllForUserId()", async () => {
    const id = "testId";
    try {
      const result = await mockService.findAllForUserId(id);
      throw new Error(
        `MockService did not correctly throw error for findAllForUserId(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(
        `Error fetching data for userId ${id}`
      );
    }
  });

  it("Should throw an error when no data is returned for create()", async () => {
    try {
      const result = await mockService.create(newUser1);
      throw new Error(
        `MockService did not correctly throw error for create(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(`Error creating user`);
    }
  });

  it("Should throw an error when no data is returned for update()", async () => {
    try {
      const result = await mockService.update((<unknown>newUser1) as User);
      throw new Error(
        `MockService did not correctly throw error for update(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(`Error updating user`);
    }
  });

  it("Should throw an error when no data is returned for delete()", async () => {
    try {
      const result = await mockService.delete((<unknown>newUser1) as User);
      throw new Error(
        `MockService did not correctly throw error for delete(): ${result}`
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe(`Error deleting user`);
    }
  });
});
