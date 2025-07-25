import express from "express";
import { dataValidator } from "../../middlewares/validation_middleware";
import AuthController from "../../controllers/auth.controller";
import { signupValidatorSchema } from "../../validators/schema/sigup.schema";
import { loginValidatorSchema } from "../../validators/schema/login.schema";
const controller = new AuthController();
const authRouter = express.Router();

authRouter.post(
  `/sign-up`,
  dataValidator(signupValidatorSchema),
  controller.createAccount
);

authRouter.post(
  `/login`,
  dataValidator(loginValidatorSchema),
  controller.login
);

export default authRouter;
