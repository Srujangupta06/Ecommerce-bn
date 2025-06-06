export class CustomError extends Error {
  statusCode: number;
  meta?: any;

  constructor(message: string = "Something went wrong", statusCode: number, meta?: any) {
    super(message);
    this.statusCode = statusCode;
    this.meta = meta;
    this.name = new.target.name; // sets name to actual subclass
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.name,
      ...(this.meta ? { meta: this.meta } : {}),
    };
  }
}
