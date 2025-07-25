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

    // console.log(queryParams);
    // const count = await Transfer.count({
    //   where: { ...queryParams },
    // });

    // const transfers = await Transfer.findAll({
    //   where: { ...queryParams },
    //   offset: paginate.page,
    //   limit: paginate.limit,
    //   order: [["createdAt", "DESC"]],
    // });

    return { transfers: [], count: 0 };
  }
}

export default new TransferRepository();
