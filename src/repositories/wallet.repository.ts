import knex from "../db/knex_db";
import { WalletInterface } from "../interface/wallet.interface";

class WalletRepository {
  async createWallet(
    data: Partial<Omit<WalletInterface, "id">>
  ): Promise<WalletInterface | null> {
    try {
      const create = await knex("wallet").insert(data);
      return create;
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getWalletByKey(
    key: string,
    value: any
  ): Promise<WalletInterface | null> {
    const wallet = knex.select("*").from("wallet").where(key, value).first();

    return wallet;
  }

  async updateWallet(id: number, updateData: Partial<any>) {
    try {
      await knex("wallet").where({ id: id }).update(updateData);
      return await this.getWalletByKey("id", id);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getWalletById(id: number): Promise<WalletInterface | null> {
    const wallet = knex.select("*").from("wallet").where("id", id).first();
    return wallet;
  }

  async getAll(paginate: any, queryParams: any) {
    if (paginate.page > 0) {
      paginate.page = paginate.page - 1;
    }

    // console.log(queryParams);
    // const count = await Wallet.count({
    //   where: { ...queryParams },
    // });

    // const wallets = await Wallet.findAll({
    //   where: { ...queryParams },
    //   offset: paginate.page,
    //   limit: paginate.limit,
    //   order: [["createdAt", "DESC"]],
    // });

    return { wallets: [], count: 0 };
  }
}

export default new WalletRepository();
