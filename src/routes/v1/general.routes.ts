import express from "express";
import { dataValidator } from "../../middlewares/validation_middleware";
import { loginValidatorSchema } from "../../validators/schema/login.schema";
const generalRouter = express.Router();

// generalRouter.post(
//   `/login`,
//   dataValidator(loginValidatorSchema),
//   AuthController.login
// );

// generalRouter
//   .route(`/fund-request/:requestId`)
//   .get(verifyBusinessToken, accountController.getFundRequest)
//   .put(verifyBusinessToken, accountController.approvedFundRequest);

export default generalRouter;
