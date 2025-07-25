import knex from "../db/knex_db";
import { CollectionInterface } from "../interface/collection.interface";

class CollectionRepository {
  async createCollection(
    data: Partial<Omit<CollectionInterface, "id">>
  ): Promise<CollectionInterface | null> {
    try {
      const create = await knex("collection").insert(data);
      return create;
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getCollectionByKey(
    key: string,
    value: any
  ): Promise<CollectionInterface | null> {
    const collection = knex
      .select("*")
      .from("collection")
      .where(key, value)
      .first();

    return collection;
  }

  async updateCollection(id: number, updateData: Partial<any>) {
    try {
      await knex("collection").where({ id: id }).update(updateData);
      return await this.getCollectionByKey("id", id);
    } catch (e: any) {
      throw new Error(e?.message);
    }
  }

  async getCollectionById(id: number): Promise<CollectionInterface | null> {
    const collection = knex
      .select("*")
      .from("collection")
      .where("id", id)
      .first();
    return collection;
  }

  async getAll(paginate: any, queryParams: any) {
    if (paginate.page > 0) {
      paginate.page = paginate.page - 1;
    }

    let query = knex.select("*").from("collection");

    if (queryParams?.userId) query.where("userId", queryParams.userId);
    if (queryParams?.startDate && queryParams?.endDate) {
      query.whereBetween("createdAt", [
        new Date(queryParams.startDate),
        new Date(queryParams.endDate),
      ]);
    }
    query.limit(paginate.limit || 10);
    const collection = await query;
    return { collection, count: 0 };
  }
}

export default new CollectionRepository();
