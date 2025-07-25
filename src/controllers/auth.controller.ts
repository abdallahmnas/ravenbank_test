import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middlewares/handlers/async";
import { httpStatus } from "../utils/constants";
import userService from "../services/user.service";
import Config from "../utils/config";
import { RavenService } from "../service-gateway/RavenGateway";
import accountService from "../services/account.service";
const { verify, sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  private readonly service;

  constructor() {
    this.service = userService;
  }

  createAccount: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body }: any = req;
      const newAcc = await this.service.createUser(body);
      return res.status(httpStatus.OK).json({
        success: true,
        // pagination,
        data: newAcc,
      });
    }
  );
  login: any = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        body: { contact, password },
      }: any = req;
      const user: any = await this.service.getByEmailOrPhone(contact, contact);
      if (!user)
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          message: "User not found",
        });

      if (user.status != "active") {
        return res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          status: user.status,
          message:
            user.status == "in-active" || user.status == "pending"
              ? "Please Activate Your Account"
              : "Your Account is Blocked",
        });
      }
      const validPass: any = await bcrypt.compare(password, user.password);

      if (!validPass)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ success: false, message: "Password Does Not Natch" });

      // let userInfo: any = user;
      delete user.pin;
      delete user.password;
      const token = sign({ paylod: user }, Config.jwtSecret, {
        expiresIn: "62h",
      });

      const account = await accountService.getUserAccount(user);

      return res.status(httpStatus.OK).json({
        success: true,
        data: { ...user, account },
        token,
      });
    }
  );
}

export default AuthController;
