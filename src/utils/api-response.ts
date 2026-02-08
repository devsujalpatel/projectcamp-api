class ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;

  constructor({
    statusCode,
    data,
    message = "success",
  }: {
    statusCode: number;
    data: T;
    message?: string;
  }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
