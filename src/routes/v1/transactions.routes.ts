import express from "express";
import TransactionController from "../../controllers/transaction.controller";
const transactionsRouter = express.Router();
const controller = new TransactionController();
transactionsRouter.get(`/`, controller.getAllTransactions);

export default transactionsRouter;
