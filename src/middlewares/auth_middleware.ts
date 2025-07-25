import { NextFunction, Request, Response } from "express";
const { verify } = require("jsonwebtoken");
import dotenv from "dotenv";
import Config from "../utils/config";
import { httpStatus } from "../utils/constants";
import UserService from "../services/user.service";
dotenv.config();

export const authMiddleWare: any = {
  // Admin Middleware
  isAdmin: (req: any, res: Response, next: NextFunction) => {
    const fetchedtoken: any = req.get("authorization");
    if (!fetchedtoken) {
      res.status(500).json({
        success: false,
        message: "Error! please provide a valid token",
      });
    } else {
      const token = fetchedtoken.replace("Bearer ", ""); //.slice(7);
      verify(token, Config.jwtSecret, async (err: any, decoded: any) => {
        if (err) {
          res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Error! invalid token",
          });
        } else {
          const decpayload = decoded.paylod;
          const user: any = await UserService.getByKey("id", decpayload.id);

          if (user) {
            if (user.status == "active" && user.verification_status == "2") {
              if (user.accountType == "admin") {
                req.user = user;
                req.admin = {};
                next(); //TODO to be removed
                // const admin = await AdminService.findByUser(user.id);
                // if (admin) {
                //   req.headers["user"] = user;
                //   req.headers["admin"] = admin;
                //   next();
                // } else {
                //   res.status(httpStatus.UNAUTHORIZED).json({
                //     success: false,
                //     message: "Admin account Not Found",
                //   });
                // }
              } else {
                res.status(httpStatus.UNAUTHORIZED).json({
                  success: false,
                  message: "This is not a admin account",
                });
              }
            } else {
              res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Account Not Verified",
              });
            }
          } else {
            res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              message: "Account Not Found",
            });
          }
        }
      });
    }
  },

  isUser: (req: any, res: Response, next: NextFunction) => {
    const fetchedtoken: any = req.get("authorization");
    if (!fetchedtoken) {
      res.status(500).json({
        success: false,
        message: "Error! please provide a valid token",
      });
    } else {
      const token = fetchedtoken.replace("Bearer ", ""); //.slice(7);
      verify(token, Config.jwtSecret, async (err: any, decoded: any) => {
        if (err) {
          res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Error! invalid token",
          });
        } else {
          const decpayload = decoded.paylod;
          const user: any = await UserService.find(decpayload.id);

          if (user) {
            if (user.status == "active") {
              delete user.pin;
              delete user.password;
              req.user = user;
              next();
            } else {
              res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                message: "Account Not Active",
              });
            }
          } else {
            res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              message: "Account Not Found",
            });
          }
        }
      });
    }
  },
};
