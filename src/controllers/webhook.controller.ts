import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middlewares/handlers/async";
import { httpStatus } from "../utils/constants";
import Utils from "../utils/util";
import { string } from "joi";
import { STATUS_CODES } from "http";

class WebhookController {
  // private readonly service;
  // private readonly stageService;

  constructor() {
    // this.service = GeneralService;
    // this.stageService = new TransactionStageService();
  }

  raven: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        body,
        body: { type, amount, session_id, account_number, secret, source },
      }: any = req;

      // Check if it is secret corresponds to webhook secret
      // Check if collection exist with session id
      // Get account number, and user that belongs to
      // credit user
      return res.status(httpStatus.OK).json({
        success: true,
        data: body,
      });
    }
  );
}

export default WebhookController;
