import knex from "../db/knex_db";
import { AccountInterface } from "../interface/account.interface";

class AccountRepository {
  async createAccount(
    data: Partial<Omit<AccountInterface, "id">>
  ): Promise<AccountInterface | null> {
    try {
      const create = await knex("accounts").insert(data);
      return create;
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getAccountByKey(
    key: string,
    value: any
  ): Promise<AccountInterface | null> {
    const account = knex.select("*").from("accounts").where(key, value).first();

    return account;
  }

  async updateAccount(id: number, updateData: Partial<any>) {
    try {
      await knex("accounts").where({ id: id }).update(updateData);
      return await this.getAccountByKey("id", id);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getAccountById(id: number): Promise<AccountInterface | null> {
    const account = knex.select("*").from("accounts").where("id", id).first();
    return account;
  }

  async getAll(paginate: any, queryParams: any) {
    if (paginate.page > 0) {
      paginate.page = paginate.page - 1;
    }

    // console.log(queryParams);
    // const count = await Account.count({
    //   where: { ...queryParams },
    // });

    // const accounts = await Account.findAll({
    //   where: { ...queryParams },
    //   offset: paginate.page,
    //   limit: paginate.limit,
    //   order: [["createdAt", "DESC"]],
    // });

    return { accounts: [], count: 0 };
  }
}

export default new AccountRepository();
