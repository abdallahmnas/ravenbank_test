import knex from "../db/knex_db";
import { TransferInterface } from "../interface/transfer.interface";

class TransferRepository {
  async createTransfer(
    data: Partial<Omit<TransferInterface, "id">>
  ): Promise<TransferInterface | null> {
    try {
      const create = await knex("transfer").insert(data);
      return create;
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getTransferByKey(
    key: string,
    value: any
  ): Promise<TransferInterface | null> {
    const transfer = knex
      .select("*")
      .from("transfer")
      .where(key, value)
      .first();

    return transfer;
  }

  async updateTransfer(id: number, updateData: Partial<any>) {
    try {
      await knex("transfer").where({ id: id }).update(updateData);
      return await this.getTransferByKey("id", id);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getTransferById(id: number): Promise<TransferInterface | null> {
    const transfer = knex.select("*").from("transfer").where("id", id).first();
    return transfer;
  }

  async getAll(paginate: any, queryParams: any) {
    if (paginate.page > 0) {
      paginate.page = paginate.page - 1;
    }

    let query = knex.select("*").from("transfer");

    if (queryParams?.userId) query.where("userId", queryParams.userId);
    if (queryParams?.status) query.where("status", queryParams.status);
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

export default new TransferRepository();
