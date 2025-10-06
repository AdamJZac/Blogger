// Define all of the error codes in one place and implement type checking
const errorCodes = {
  BadRequestError: { statusCode: 400, message: "Bad request" },
  ValidationError: { statusCode: 400, message: "Validation error" },
  UnauthorizedError: { statusCode: 401, message: "Unauthorized request" },
  ForbiddenError: { statusCode: 403, message: "Forbidden" },
  NotFoundError: { statusCode: 404, message: "Resource not found" },
  ConflictError: { statusCode: 409, message: "Resource already taken" },
} as const;
type ErrorCodesPairs = typeof errorCodes;
type ErrorCodes = keyof ErrorCodesPairs;

export abstract class AppError extends Error {
  public readonly statusCode: number;
  public readonly cause?: Error | undefined;

  constructor(name: ErrorCodes, cause?: Error) {
    super(errorCodes[name]["message"]);
    this.statusCode = errorCodes[name]["statusCode"];
    this.cause = cause;
  }
}

export class BadRequestError extends AppError {
  constructor(cause?: Error) {
    super("BadRequestError", cause);
    this.name = "BadRequestError";
  }
}

export class ValidationError extends AppError {
  constructor(cause?: Error) {
    super("ValidationError", cause);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(cause?: Error) {
    super("UnauthorizedError", cause);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(cause?: Error) {
    super("ForbiddenError", cause);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(cause?: Error) {
    super("NotFoundError", cause);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(cause?: Error) {
    super("ConflictError", cause);
    this.name = "ConflictError";
  }
}
