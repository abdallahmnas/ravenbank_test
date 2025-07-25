import { UserInterface } from "../interface/user.interface";
import User from "../models/User";
import userRepository from "../repositories/user.repository";
import walletRepository from "../repositories/wallet.repository";
import Config from "../utils/config";
const bcrypt = require("bcrypt");

class UserService {
  async createUser(
    data: Partial<UserInterface>
  ): Promise<UserInterface | null> {
    const getUser = await this.getByEmailOrPhone(
      data.email as string,
      data.phone
    );
    if (getUser) throw new Error("User already exist");

    const salt = await bcrypt.genSalt(Config.bcryptSalt);
    const encryptedPassword = await bcrypt.hash(data.password, salt);
    const user: any = await userRepository.createUser({
      ...data,
      password: encryptedPassword,
    });
    await walletRepository.createWallet({
      userId: user[0],
    });
    return user;
  }

  async updateUser(userId: number, data: Partial<User>) {
    const user = await userRepository.updateUser(userId, data);

    return user;
  }

  getByEmailOrPhone = async (email: string, phone: any) => {
    const user = await userRepository.getByEmailOrPhone(email, phone);
    console.log(user);
    return user;
  };
  getAll = async (
    paginate: { limit: number; page: number },
    queryParams: any
  ) => {
    const { users, count } = await userRepository.getAllUsers(
      paginate,
      queryParams
    );
    return { users, count };
  };

  // getAllByDate = async (
  //   creditAccountNumber: string,
  //   startDate: number,
  //   endDate: number
  // ) => {
  //   const transactions = await userRepository.getAllByDate(
  //     creditAccountNumber,
  //     startDate,
  //     endDate
  //   );
  //   return transactions;
  // };

  // getByRef = async (reference: string) => {
  //   const users = await userRepository.getUserByRef(reference);
  //   return users;
  // };

  getByKey = async (key: string, value: any) => {
    const users = await userRepository.getUserByKey(key, value);
    return users;
  };

  find = async (value: any) => {
    const users = await userRepository.getUserByKey("id", value);
    return users;
  };
}

export default new UserService();
