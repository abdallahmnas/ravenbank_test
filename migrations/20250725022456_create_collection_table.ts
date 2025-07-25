import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("collection", (table: any) => {
    table.increments("id");
    table.string("reference").defaultTo("");
    table.string("sessionId").defaultTo("");
    table.string("accountNumber").defaultTo("");
    table.string("senderAccountNumber").defaultTo("");
    table.string("senderAccountName").defaultTo("");
    table.string("senderBankCode").defaultTo("");
    table.string("senderBankName").defaultTo("");
    table.string("senderFirstName").defaultTo("");
    table.string("senderLastName").defaultTo("");
    table.string("collectionDate").defaultTo("");
    table.string("narration").defaultTo("");
    table.double("amount", 25, 2).notNullable().defaultTo(0);
    table.text("responseData").defaultTo("");
    table.integer("userId").unsigned().references("users.id");
    table.integer("transactionId").unsigned().references("transactions.id");
    table.timestamps(true, true); // created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("collection");
}
