import { AccountInterface } from "../interface/account.interface";
import { UserInterface } from "../interface/user.interface";
import accountRepository from "../repositories/account.repository";
import walletRepository from "../repositories/wallet.repository";
import { RavenService } from "../service-gateway/RavenGateway";
import Config from "../utils/config";
const bcrypt = require("bcrypt");

class AccountService {
  async createAccount(
    data: Partial<AccountInterface>
  ): Promise<AccountInterface | null> {
    const getAccount = await this.getByKey("userId", data.userId);
    if (getAccount) throw new Error("Account already exist");

    const account: any = await accountRepository.createAccount(data);

    return account;
  }

  async updateAccount(accountId: number, data: Partial<AccountInterface>) {
    const account = await accountRepository.updateAccount(accountId, data);

    return account;
  }

  getUserAccount = async (user: UserInterface) => {
    const account = await accountRepository.getAccountByKey("userId", user.id);
    if (!account) {
      const raven = new RavenService();
      const newAccount = await raven.createAccount({
        first_name: user.firstName,
        last_name: user.lastName,
        phone: user.phone,
        amount: 100,
        email: user.email,
      });
      if (!newAccount.success) throw new Error(newAccount.message);
      const payload = {
        userId: user.id,
        accountName: newAccount.data?.account_name,
        accountNumber: newAccount.data?.account_number,
        bankName: newAccount.data?.bank,
        bankCode: newAccount.data?.bank,
        status: "active",
      };
      await this.createAccount(payload);
      return payload;
    }

    return account;
  };
  // getAll = async (
  //   paginate: { limit: number; page: number },
  //   queryParams: any
  // ) => {
  //   const { accounts, count } = await accountRepository.getAllAccounts(
  //     paginate,
  //     queryParams
  //   );
  //   return { accounts, count };
  // };

  getByKey = async (key: string, value: any) => {
    const accounts = await accountRepository.getAccountByKey(key, value);
    return accounts;
  };

  find = async (value: any) => {
    const accounts = await accountRepository.getAccountByKey("id", value);
    return accounts;
  };
}

export default new AccountService();
