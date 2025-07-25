interface errorParams {
  statusCode: number;
  message: string;
  errorCode?: string;
  token?: string;
}

class ErrorResponse extends Error {
  status: number;
  success: boolean;
  errorCode?: string;
  token?: string;

  constructor({ statusCode, message, errorCode, token }: errorParams) {
    super(message);
    this.status = statusCode;
    this.success = false;
    this.errorCode = errorCode;
    this.token = token;
  }
}

export default ErrorResponse;
