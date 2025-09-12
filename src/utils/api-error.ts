class ApiError extends Error {
  statusCode: number;
  errors: any[];

  constructor({
    statusCode,
    message = 'Something Went Wrong',
    errors = [],
    stack = '',
  }: {
    statusCode: number;
    message?: string;
    errors?: any[];
    stack?: string;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
