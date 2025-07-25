import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "./index";
import Utils from "../utils/util";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: number;
  declare firstname: string;
  declare middlename: string | null;
  declare surname: string;
  declare fullname: string;
  declare photo: Text | null;
  declare businessId: number;
  declare tagName: string | null;
  declare pin: string | null;
  declare dateOfBirth: Date | null;
  declare gender: "Male" | "Female";
  declare country: string | null;
  declare state: string | null;
  declare lga: string | null;
  declare address: string | null;
  declare phone: string;
  declare email: string;
  declare tier: "0" | "1" | "2" | "3";
  declare accountCreated: boolean;
  declare bvn: string | null;
  declare nin: string | null;
  declare deviceId: string | null;
  declare verificationStatus: string;
  declare profileCompleted: boolean;
  declare accountType:
    | "individual"
    | "business"
    | "agent"
    | "admin"
    | "baas"
    | "superadmin"
    | "staff";
  declare isReferred: boolean;
  declare referredBy: string | null;
  declare status: "active" | "suspended" | "deleted" | "pending" | "disabled";
  // declare deviceId: string | null;
  declare lastLogin: number | null;
  declare password: string | null;
  declare createdAt: number;
  declare updatedAt: number;
}

export default User;
