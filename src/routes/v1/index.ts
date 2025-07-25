import { Router } from "express";
import authRouter from "./auth.routes";
import transactionsRouter from "./transactions.routes";
import transferRouter from "./transfer.routes";
import { authMiddleWare } from "../../middlewares/auth_middleware";
import WebhookController from "../../controllers/webhook.controller";

const router: Router = Router();
const webhookController = new WebhookController();
router.use("/auth", authRouter);
// Webhook
router.post("/webhook/raven", webhookController.raven);
router.use(authMiddleWare.isUser);
router.use("/transactions", transactionsRouter);
router.use("/transfer", transferRouter);

export default router;
