import { Request, Response, NextFunction, response } from "express";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middlewares/handlers/async";
import { httpStatus } from "../utils/constants";
import Utils from "../utils/util";
import { string } from "joi";
import { STATUS_CODES } from "http";
import walletService from "../services/wallet.service";
import { RavenService } from "../service-gateway/RavenGateway";
import transferRepository from "../repositories/transfer.repository";
import transactionRepository from "../repositories/transaction.repository";

class TransferController {
  private readonly service;
  private readonly transactionService;
  private readonly ravenService;

  constructor() {
    this.service = transferRepository;
    this.transactionService = transactionRepository;
    this.ravenService = new RavenService();
  }

  getAllBanks: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user }: any = req;
      const banks = await this.ravenService.bankList();
      return res
        .status(banks.success ? httpStatus.OK : httpStatus.BAD_REQUEST)
        .json(banks);
    }
  );
  accountInfo: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        user,
        body: { accountNumber, bankCode },
      }: any = req;
      const accountInfo = await this.ravenService.accountInfo({
        bank: bankCode,
        account_number: accountNumber,
      });
      return res
        .status(accountInfo.success ? httpStatus.OK : httpStatus.BAD_REQUEST)
        .json(accountInfo);
    }
  );
  makeTransfer: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        user,
        body: { accountNumber, bankCode, amount, narration = "" },
      }: any = req;

      const reference = Utils.randomRef();
      const accountInfo = await this.ravenService.accountInfo({
        bank: bankCode,
        account_number: accountNumber,
      });
      if (!accountInfo.success)
        return res.status(httpStatus.BAD_REQUEST).json(accountInfo);

      const charges = 0;
      const netAmount = Number(amount) + charges;
      // Debit wallet
      // Ctreate Transaction Record
      const debit = await walletService.debitUserWallet(user.id, {
        amount: netAmount,
        // narration,
        // reference,
        // transactionType: "transfer",
      });
      if (!debit.success) return res.status(httpStatus.BAD_REQUEST).json(debit);

      const transferPayload = {
        accountNumber,
        accountName: "",
        bankCode,
        bankName: bankCode,
        amount,
        narration,
        reference,
        provider: "raven",
        userId: user.id,
      };
      const transferRecord: any = await this.service.createTransfer(
        transferPayload
      );
      // Create Transaction Record
      const transactionPayload: any = {
        description: `Transfer to ${accountInfo.data}`,
        reference,
        channelReference: "",
        channel: "raven",
        amount,
        charges,
        netAmount,
        action: "debit",
        remark: narration,
        transactionType: "transfer",
        userId: user.id,
        status: "pending",
        details: JSON.stringify(transferPayload),
        responseData: "", //Recieved from Profivder
        // responseMessage: "", //Recieved from Profivder
      };
      const transaction: any = await this.transactionService.createTransaction(
        transactionPayload
      );
      console.log("Transaction Created: ", transaction);
      const transfer = await this.ravenService.transfer({
        bank_code: bankCode,
        bank: bankCode,
        account_number: accountNumber,
        amount,
        account_name: accountInfo?.data,
        narration,
        reference,
      });

      await this.transactionService.updateTransaction(Number(transaction[0]), {
        status: transfer.success ? "successful" : "failed",
        responseData: JSON.stringify(transfer.data),
      });
      await this.service.updateTransfer(transferRecord[0], {
        status: transfer.success ? "successful" : "failed",
        responseData: JSON.stringify(transfer.data),
      });
      if (!transfer.success) {
        const credit = await walletService.creditUserWallet(user.id, {
          amount: netAmount,
          // narration,
          // reference,
          // transactionType: "refund",
        });

        return res.status(httpStatus.BAD_REQUEST).json({
          success: true,
          message: transfer?.message || "Transfer Failed",
        });
      }

      return res.status(httpStatus.OK).json({
        success: true,
        message: "Transfer Initiated",
        data: transaction,
      });
    }
  );
}

export default TransferController;
