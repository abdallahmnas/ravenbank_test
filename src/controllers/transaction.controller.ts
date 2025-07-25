import { Request, Response, NextFunction, query } from "express";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middlewares/handlers/async";
import { httpStatus } from "../utils/constants";
import Utils from "../utils/util";
import { string } from "joi";
import { STATUS_CODES } from "http";
import walletService from "../services/wallet.service";
import transactionRepository from "../repositories/transaction.repository";

class TransactionController {
  private readonly service;
  private readonly walletService;

  constructor() {
    this.service = transactionRepository;
    this.walletService = walletService;
  }

  getAllTransactions: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user }: any = req;
      const { action, status, transactionType } = req.query;
      const queryParams: any = {};

      queryParams.userId = user.id; // Assuming user.id is the user identifier
      if (action) queryParams.action = action;
      if (status) queryParams.status = status;
      if (transactionType) queryParams.transactionType = transactionType;

      const queryrpage: any = req.query.page ?? 1;
      let queryLimit: any = req.query.limit ?? 10;
      let page: number = parseInt(queryrpage);
      let limit: number = parseInt(queryLimit);

      const { transactions = [], count = 0 } = await this.service.getAll(
        { limit, page },
        queryParams
      );

      const pagination = Utils.paginate(count, limit, page);

      return res.status(httpStatus.OK).json({
        success: true,
        // pagination,
        data: transactions,
      });
    }
  );
}

export default TransactionController;
