import express from "express";
import TransferController from "../../controllers/transfer.controller";
import { dataValidator } from "../../middlewares/validation_middleware";
import { transferValidatorSchema } from "../../validators/schema/transfer.schema";
const transactionsRouter = express.Router();
const controller = new TransferController();
transactionsRouter.post(
  `/`,
  dataValidator(transferValidatorSchema),
  controller.makeTransfer
);
transactionsRouter.get(`/banks`, controller.getAllBanks);
transactionsRouter.post(`/account-info`, controller.accountInfo);

export default transactionsRouter;
