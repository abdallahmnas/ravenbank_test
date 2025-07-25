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

    let query = knex.select("*").from("accounts");

    if (queryParams?.userId) query.where("userId", queryParams.userId);
    if (queryParams?.status) query.where("status", queryParams.status);
    if (queryParams?.accountNumber)
      query.where("accountNumber", queryParams.accountNumber);
    if (queryParams?.startDate && queryParams?.endDate) {
      query.whereBetween("createdAt", [
        new Date(queryParams.startDate),
        new Date(queryParams.endDate),
      ]);
    }
    query.limit(paginate.limit || 10);
    const transactions = await query;
    return { transactions, count: 0 };
  }
}

export default new AccountRepository();
