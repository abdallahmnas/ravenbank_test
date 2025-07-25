import knex from "../db/knex_db";
import { TransactionInterface } from "../interface/transaction.interface";

class TransactionRepository {
  async createTransaction(
    data: Partial<Omit<TransactionInterface, "id">>
  ): Promise<TransactionInterface | null> {
    try {
      const create = await knex("transactions").insert(data);
      return create;
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getTransactionByKey(
    key: string,
    value: any
  ): Promise<TransactionInterface | null> {
    const transaction = knex
      .select("*")
      .from("transactions")
      .where(key, value)
      .first();

    return transaction;
  }

  async updateTransaction(id: number, updateData: Partial<any>) {
    try {
      await knex("transactions").where({ id: id }).update(updateData);
      return await this.getTransactionByKey("id", id);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getTransactionById(id: number): Promise<TransactionInterface | null> {
    const transaction = knex
      .select("*")
      .from("transactions")
      .where("id", id)
      .first();
    return transaction;
  }

  async getAll(paginate: any, queryParams: any) {
    if (paginate.page > 0) {
      paginate.page = paginate.page - 1;
    }

    let query = knex.select("*").from("transactions");

    if (queryParams?.userId) query.where("userId", queryParams.userId);
    if (queryParams?.status) query.where("status", queryParams.status);
    if (queryParams?.transactionTyp)
      query.where("transactionTyp", queryParams.transactionTyp);
    if (queryParams?.action) query.where("action", queryParams.action);
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

export default new TransactionRepository();
