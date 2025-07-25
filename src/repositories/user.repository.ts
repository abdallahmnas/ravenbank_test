import knex from "../db/knex_db";
import { UserInterface } from "../interface/user.interface";

class UserRepository {
  async createUser(
    data: Partial<Omit<UserInterface, "id">>
  ): Promise<UserInterface | null> {
    try {
      const create = await knex("users").insert(data);
      return create;
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getUserByKey(key: string, value: any): Promise<UserInterface | null> {
    const user = knex.select("*").from("users").where(key, value).first();

    return user;
    // return await User.findOne({ where: { [key]: value } });
  }

  async updateUser(id: number, updateData: Partial<any>) {
    try {
      await knex("users").where({ id: id }).update(updateData);
      return await this.getUserByKey("id", id);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getUserById(id: number): Promise<UserInterface | null> {
    const user = knex.select("*").from("users").where("id", id).first();

    return user;
  }
  async getByEmailOrPhone(
    email: string,
    phone: string
  ): Promise<UserInterface | null> {
    const user = knex
      .select("*")
      .from("users")
      .where("email", email)
      .orWhere("phone", phone)
      .first();

    return user;
  }
  async getAllUsers(paginate: any, queryParams: any) {
    if (paginate.page > 0) {
      paginate.page = paginate.page - 1;
    }
    const users = await knex
      // .select("*")
      .select(
        "users.*",
        "users.id as user_id",
        // "users.firstName",
        // "users.lastName",
        // "users.email",
        // "users.phone",
        // "users.gender",
        // "users.state",
        // "users.lga",
        // "users.verified",
        // "users.status",
        "wallet.id as wallet_id",
        "wallet.currency",
        "wallet.balance",
        "wallet.prevBalance",
        "wallet.status as wallet_status"
      )
      .from("users")
      .leftJoin("wallet", "users.id", "wallet.userId")
      .select("users.*", "wallet.*")
      .limit(paginate?.limit ?? 10)
      .groupBy("userId");

    return {
      users: users.map((row: any) => ({
        id: row.user_id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        phone: row.phone,
        gender: row.gender,
        state: row.state,
        lga: row.lga,
        verified: row.verified,
        status: row.status,
        wallet: row.wallet_id
          ? {
              id: row.wallet_id,
              currency: row.currency,
              balance: Number(row.balance),
              prevBalance: Number(row.prevBalance),
              status: row.wallet_status,
            }
          : null,
      })),
      count: 0,
    };
  }
}

export default new UserRepository();
