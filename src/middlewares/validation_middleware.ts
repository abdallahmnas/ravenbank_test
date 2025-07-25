import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";  
import { httpStatus } from "../utils/constants";
import { validatedData } from "../validators";
dotenv.config();

export const dataValidator = (validatorSchema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const hasError = validatedData(validatorSchema, req?.body);
    if (hasError) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ success: false, message: hasError });
    } else {
      next();
    }
  };
};
