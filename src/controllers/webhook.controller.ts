import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import asyncHandler from "../middlewares/handlers/async";
import { httpStatus } from "../utils/constants";
import Utils from "../utils/util";
import { string } from "joi";
import { STATUS_CODES } from "http";
import collectionRepository from "../repositories/collection.repository";
import transactionRepository from "../repositories/transaction.repository";
import accountRepository from "../repositories/account.repository";
import walletService from "../services/wallet.service";
import Config from "../utils/config";

class WebhookController {
  private readonly service;
  private readonly transactionService;
  private readonly walletService;
  private readonly accountService;

  constructor() {
    this.service = collectionRepository;
    this.transactionService = transactionRepository;
    this.walletService = walletService;
    this.accountService = accountRepository;
  }

  raven: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        body,
        body: { type, amount, session_id, account_number, secret, source },
      }: any = req;

      const reference = Utils.customRef();
      // Check if it is secret corresponds to webhook secret
      if (secret != Config.raven.webhookSecret)
        return res
          .status(400)
          .json({ success: false, message: "Invalid Secret" });

      const collectionPayload: any = {
        reference,
        sessionId: session_id,
        accountNumber: account_number,
        senderAccountNumber: source?.account_number,
        senderAccountName: source?.sender,
        senderBankCode: source?.bank_code,
        senderBankName: source?.bank,
        senderFirstName: source?.first_name,
        senderLastName: source?.last_name,
        collectionDate: source?.createdAt,
        narration: source?.narration,
        amount,
        responseData: JSON.stringify({ ...body, secret: "" }),
        userId: null,
        transactionId: null,
      };
      // Check if collection exist with session id
      const checkCollection = await this.service.getCollectionByKey(
        "sessionId",
        session_id
      );
      if (checkCollection)
        return res
          .status(400)
          .json({ success: false, message: "Record exist" });
      const collection: any = await this.service.createCollection(
        collectionPayload
      );
      const account = await this.accountService.getAccountByKey(
        "accountNumber",
        account_number
      );
      if (!account)
        return res
          .status(400)
          .json({ success: false, message: "Account does not exist" });

      const transactionPayload: any = {
        description: `Transfer from ${source?.first_name}`,
        reference,
        channelReference: "",
        channel: "raven",
        amount,
        charges: 0,
        netAmount: amount,
        action: "credit",
        remark: source?.narration,
        transactionType: "transfer",
        userId: account.userId,
        status: "pending",
        details: JSON.stringify(collectionPayload),
        responseData: JSON.stringify({ ...body, secret: "" }), //Recieved from Profivder
        // responseMessage: "", //Recieved from Profivder
      };
      const transaction: any = await this.transactionService.createTransaction(
        transactionPayload
      );
      const credit = await walletService.creditUserWallet(account.userId, {
        amount: amount,
        // narration,
        // reference,
        // transactionType: "transfer",
      });
      if (!credit.success)
        return res.status(httpStatus.BAD_REQUEST).json(credit);

      await this.transactionService.updateTransaction(Number(transaction[0]), {
        status: "successful",
      });

      await this.service.updateCollection(Number(collection[0]), {
        transactionId: Number(transaction[0]),
        userId: account.userId,
      });
      // credit user
      return res.status(httpStatus.OK).json({
        success: true,
      });
    }
  );
}

export default WebhookController;
