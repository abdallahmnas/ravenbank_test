import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transactions", (table: any) => {
    table.increments("id");
    table.text("description").defaultTo("");
    table.string("remark").defaultTo("");
    table.string("reference").defaultTo("");
    table.string("channelReference").defaultTo("");
    table.string("channel").defaultTo("");
    table.string("transactionType").defaultTo("");
    table.string("details").defaultTo("");
    table.text("responseData").defaultTo("");
    table.string("action").defaultTo(""); //credit,debit
    table.double("amount", 25, 2).notNullable().defaultTo(0);
    table.double("netAmount", 25, 2).defaultTo(0);
    table.double("charges", 25, 2).defaultTo(0);
    table.string("status").defaultTo("pending");
    table.integer("userId").unsigned().references("users.id");
    table.timestamps(true, true); // created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transactions");
}
