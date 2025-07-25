import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transfer", (table: any) => {
    table.increments("id");
    table.string("reference").defaultTo("");
    table.string("channelReference").defaultTo("");
    table.string("accountName").defaultTo("");
    table.string("accountNumber").defaultTo("");
    table.string("bankCode").defaultTo("");
    table.string("bankName").defaultTo("");
    table.string("narration").defaultTo("");
    table.string("provider").defaultTo("");
    table.double("amount", 25, 2).notNullable().defaultTo(0);
    table.text("responseData").defaultTo("");
    table.string("status").defaultTo("pending");
    table.integer("userId").unsigned().references("users.id");
    table.timestamps(true, true); // created_at and updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transfer");
}
