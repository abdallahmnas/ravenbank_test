import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middlewares/handlers/async";
import { httpStatus } from "../utils/constants";
import Utils from "../utils/util";
import { string } from "joi";
import { STATUS_CODES } from "http";

class GeneralController {
  // private readonly service;
  // private readonly stageService;

  constructor() {
    // this.service = GeneralService;
    // this.stageService = new TransactionStageService();
  }

  // getAllTransactions: any = asyncHandler(
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const { user }: any = req;
  //     // console.log(user);
  //     const { action, transactionType } = req.query;
  //     const queryParams: any = {};

  //     if (action) queryParams.action = action;
  //     if (transactionType) queryParams.transactionType = transactionType;

  //     // const queryrpage: any = req.query.page ?? 1;
  //     // let queryLimit: any = req.query.limit ?? 10;
  //     // let page: number = parseInt(queryrpage);
  //     // let limit: number = parseInt(queryLimit);

  //     const { transactions = [], count = 0 } =
  //       await transactionTransactionsService.getAllByUser(
  //         user.accountType,
  //         // { limit, page },
  //         queryParams
  //       );

  //     // const pagination = Utils.paginate(count, limit, page);

  //     res.status(httpStatus.OK).json({
  //       success: true,
  //       // pagination,
  //       data: transactions,
  //     });
  //   }
  // );
}

export default GeneralController;
