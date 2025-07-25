import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/errorResponse";

const errorHandler = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorData: { [key: string]: any } = {};

  const status: number = error.status || 500;
  errorData.message = error.message || "Something went wrong";
  errorData.errorCode = error.errorCode || "ERR-00";
  errorData.success = false;
  if (error.token) errorData.token = error.token;

  console.error(error);
  res.status(status).json(errorData);
};

export default errorHandler;
